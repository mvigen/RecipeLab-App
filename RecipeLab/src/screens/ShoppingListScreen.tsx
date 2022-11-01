import {
  Dimensions,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {statusType, userContext} from '../userContext';
import Modal from 'react-native-modal';
import Drawer from '../components/Drawer/Drawer';
import ShoppingListList from '../components/ShoppingListList/ShoppingListList';
import {gql, useMutation, useQuery} from '@apollo/client';
import {ShoppingList} from '../graphql/__generated__/ShoppingList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, IconName} from '../enums/enums';
import {
  AddIngredientInput,
  AddShoppingListItemInput,
  RemoveShoppingListItemInput,
} from '../graphql/__generated__/globalTypes';
import {REMOVE_INGREDIENT} from '../components/ShoppingListItem/ShoppingListItem';
import {useTranslation} from 'react-i18next';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import SearchList, {Product} from '../components/SearchList/SearchList';
import {productDefaultState} from './recipe/AddRecipeScreen';

export const SHOPPINGLIST_QUERY = gql`
  query ShoppingList {
    user {
      activeShoppingList {
        name
        ingredients {
          name
          amount
          isMarked
          imgUrl
          id
        }
      }
    }
  }
`;

const ADD_ITEM_SHOPPINGLIST = gql`
  mutation addItemToShoppingList($input: AddShoppingListItemInput) {
    addItemToShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const ShoppingListScreen = () => {
  const {isSignedIn, setStatus} = useContext(userContext);
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [searchList, setSearchlist] = useState<Product[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [product, setProduct] = useState<Product>(productDefaultState);

  const {data, refetch} = useQuery<ShoppingList>(SHOPPINGLIST_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [addItemToShoppingList] = useMutation<AddShoppingListItemInput>(
    ADD_ITEM_SHOPPINGLIST,
    {
      refetchQueries: [SHOPPINGLIST_QUERY, 'ShoppingList'],
    },
  );

  const [removeItems] = useMutation<RemoveShoppingListItemInput>(
    REMOVE_INGREDIENT,
    {
      refetchQueries: [SHOPPINGLIST_QUERY, 'ShoppingList'],
    },
  );

  const Search = (searchWord: string) => {
    if (searchWord != '') {
      axios
        .get(
          `https://dotnet-recipelab.herokuapp.com/salling/search?searchTerm=${searchWord}`,
        )
        .then(response => {
          setSearchlist(response.data);
        })
        .catch(e =>
          setStatus({
            showToast: true,
            statusMsg: e.response.request._response,
            type: statusType.ERROR,
          }),
        );
    }
  };

  useEffect(() => {
    refetch();
  }, [isSignedIn]);

  return isSignedIn ? (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name={IconName.DELETE}
          style={[styles.Icon, {backgroundColor: 'red'}]}
          size={25}
          color="white"
          onPress={() => {
            setIsVisible(true);
          }}
        />
        <Icon
          name={IconName.ADD}
          style={[styles.Icon, {marginRight: 10}]}
          size={25}
          color="white"
          onPress={() => setAddModalIsVisible(true)}
        />
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
          onSwipeComplete={() => {
            setIsVisible(false);
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          swipeDirection="right"
          useNativeDriver
          hideModalContentWhileAnimating
          propagateSwipe
          style={styles.modal}>
          <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.text}>
              {t('shoppingList.DeleteIngredients')}
            </Text>
            <View style={styles.rowMargin}>
              <Button
                mode="contained"
                style={styles.cancelButton}
                onPress={() => setIsVisible(false)}>
                {t('recipe.Cancel')}
              </Button>
              <Button
                mode="contained"
                style={styles.deleteButton}
                onPress={() => {
                  const temp =
                    data?.user?.activeShoppingList?.ingredients?.slice();

                  removeItems({
                    variables: {
                      input: {
                        ingredientIdList: temp
                          ?.filter(item => item?.isMarked === true)
                          .map(item => item?.id),
                      },
                    },
                  })
                    .then(() =>
                      setStatus({
                        showToast: true,
                        statusMsg: t('status.RemovedIngredients'),
                        type: statusType.SUCCESS,
                      }),
                    )
                    .catch(e =>
                      setStatus({
                        showToast: true,
                        statusMsg: e.message,
                        type: statusType.ERROR,
                      }),
                    );
                  setIsVisible(false);
                }}>
                {t('recipe.Delete')}
              </Button>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          isVisible={addModalIsVisible}
          onBackdropPress={() => {
            setAddModalIsVisible(false);
          }}
          onSwipeComplete={() => {
            setAddModalIsVisible(false);
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          swipeDirection="right"
          useNativeDriver
          hideModalContentWhileAnimating
          propagateSwipe
          style={styles.addModal}>
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
              <Icon
                onPress={() => {
                  setAddModalIsVisible(false);
                  setSearchlist([]);
                  setProduct(productDefaultState);
                }}
                size={25}
                style={styles.icon}
                name={IconName.REMOVE}
              />
              <View style={{height: searchList.length === 0 ? 70 : 300}}>
                <SearchList
                  value={product.name == '' ? undefined : product.name}
                  onItemPress={ingredient => {
                    setProduct(ingredient);
                    setSearchlist([]);
                  }}
                  data={searchList}
                  label={t('recipe.SearchIngredient')}
                  onEndEditing={e => Search(e.nativeEvent.text)}
                  onFocus={() => setSearchlist([])}
                />
              </View>
              <TextInput
                label={t('recipe.Amount')}
                mode="outlined"
                activeOutlineColor={Colors.PRIMARY}
                style={styles.textinput}
                right={<TextInput.Affix text="g" />}
                onChangeText={text =>
                  setAmount(text == '' ? text : text + ' g')
                }
              />
              <Button
                onPress={() => {
                  if (product.name != '') {
                    addItemToShoppingList({
                      variables: {
                        input: {
                          description: product.description,
                          imgUrl: product.imgUrl,
                          name: product.name,
                          price: product.price,
                          sallingProdId: product.sallingProdId,
                          url: product.url,
                          amount: amount,
                        },
                      },
                    })
                      .then(() =>
                        setStatus({
                          showToast: true,
                          statusMsg: t('status.AddedItemToShoppinglist'),
                          type: statusType.SUCCESS,
                        }),
                      )
                      .catch(e =>
                        setStatus({
                          showToast: true,
                          statusMsg: e.message,
                          type: statusType.ERROR,
                        }),
                      );

                    setAddModalIsVisible(false);
                    setSearchlist([]);
                    setProduct(productDefaultState);
                  }
                }}
                mode="contained"
                style={styles.addingredientbutton}>
                {t('recipe.AddIngredient')}
              </Button>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
      <ShoppingListList
        shoppingList={data?.user?.activeShoppingList?.ingredients}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.noAccessText}>{t('shoppingList.NoAccess')}</Text>
    </View>
  );
};
export default ShoppingListScreen;

const styles = StyleSheet.create({
  addingredientbutton: {
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
  },
  cancelButton: {borderRadius: 25, backgroundColor: Colors.PRIMARY},
  deleteButton: {
    marginLeft: 'auto',
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
  },
  rowMargin: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  safeAreaView: {
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  noAccessText: {
    fontSize: 30,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  modal: {
    flex: 1,
    margin: '10%',
    marginVertical: '80%',
  },
  addModal: {
    flex: 1,
    margin: '10%',
    marginVertical: '30%',
  },
  icon: {
    marginLeft: 'auto',
    marginTop: 5,
  },
  textinput: {
    marginTop: 10,
  },
  Icon: {
    flexGrow: 0,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    padding: 5,
    elevation: 4,
    alignSelf: 'center',
  },
  iconContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row-reverse',
  },
  text: {margin: 20, alignItems: 'center'},
});
