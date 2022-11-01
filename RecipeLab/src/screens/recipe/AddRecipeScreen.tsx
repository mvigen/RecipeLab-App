import React, {useContext, useState} from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  View,
} from 'react-native';
import {Avatar, Button, Switch, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import {Colors, IconName} from '../../enums/enums';
import SearchList, {Product} from '../../components/SearchList/SearchList';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {gql, useMutation} from '@apollo/client';
import {
  AddDirectionsInput,
  AddIngredientInput,
  AddRecipeInput,
} from '../../graphql/__generated__/globalTypes';
import {RECIPE_QUERY} from './RecipeScreen';
import {useTranslation} from 'react-i18next';
import {statusType, userContext} from '../../userContext';

export const productDefaultState = {
  description: '',
  imgUrl: '',
  name: '',
  price: 0,
  sallingProdId: '',
  url: '',
};

const ADD_RECIPE = gql`
  mutation addRecipe($input: AddRecipeInput) {
    addRecipe(input: $input) {
      data {
        id
      }
    }
  }
`;

const AddRecipeScreen = () => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState('');
  const [timeToMake, setTimeToMake] = useState('');
  const [servings, setServings] = useState('');
  const [searchList, setSearchlist] = useState<Product[]>([]);
  const [ingredientList, setIngredientList] = useState<AddIngredientInput[]>(
    [],
  );
  const [stepDirection, setStepDirection] = useState<AddDirectionsInput>({
    direction: '',
  });
  const [directionsList, setDirectionsList] = useState<AddDirectionsInput[]>(
    [],
  );
  const [isVisible, setIsVisible] = useState(false);
  const {setStatus} = useContext(userContext);
  const [product, setProduct] = useState<Product>(productDefaultState);
  const [amount, setAmount] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addRecipe] = useMutation<AddRecipeInput>(ADD_RECIPE, {
    refetchQueries: [RECIPE_QUERY, 'Recipes'],
  });
  const {t} = useTranslation();

  const Search = (searchWord: string) => {
    if (searchWord != '') {
      axios
        .get(
          `https://dotnet-recipelab.herokuapp.com/salling/search?searchTerm=${searchWord}`,
        )
        .then(response => {
          setSearchlist(response.data);
        })
        .catch(error => {
          setStatus({
            showToast: true,
            statusMsg: error.response.request._response,
            type: statusType.ERROR,
          });
        });
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollview}>
      <View style={styles.row}>
        <TextInput
          label={t('recipe.RecipeName')}
          mode="outlined"
          selectionColor={Colors.PRIMARY}
          activeOutlineColor={Colors.PRIMARY}
          style={styles.textinputFlex}
          onChangeText={text => setName(text)}
          value={name}
        />
        <View style={styles.switch}>
          <Text>{t('recipe.Private')}</Text>
          <Switch
            value={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
      <TextInput
        label={t('recipe.Description')}
        mode="outlined"
        activeOutlineColor={Colors.PRIMARY}
        multiline
        style={styles.textinput}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <View style={styles.row}>
        <TextInput
          label={t('recipe.TimeToMake')}
          mode="outlined"
          activeOutlineColor={Colors.PRIMARY}
          style={styles.textinputTimeToMake}
          right={<TextInput.Affix text="min" />}
          value={timeToMake}
          keyboardType={'numeric'}
          onChangeText={text => setTimeToMake(text.replace(/[^0-9]/g, ''))}
        />
        <TextInput
          label={t('recipe.Servings')}
          mode="outlined"
          activeOutlineColor={Colors.PRIMARY}
          style={styles.textinputFlex}
          keyboardType={'numeric'}
          value={servings}
          onChangeText={text => setServings(text.replace(/[^0-9]/g, ''))}
        />
      </View>
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
        style={styles.sideMenuStyle}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Icon
              onPress={() => {
                setIsVisible(false);
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
              onEndEditing={(
                e: NativeSyntheticEvent<TextInputEndEditingEventData>,
              ) => {
                setAmount(
                  e.nativeEvent.text == ''
                    ? e.nativeEvent.text
                    : e.nativeEvent.text + ' g',
                );
              }}
            />
            <Button
              onPress={() => {
                if (product.name != '') {
                  const newIngredient: AddIngredientInput = {
                    description: product.description,
                    imgUrl: product.imgUrl,
                    name: product.name,
                    price: product.price,
                    sallingProdId: product.sallingProdId,
                    url: product.url,
                    amount: amount,
                  };
                  setIngredientList(oldingredientlist => [
                    ...oldingredientlist,
                    newIngredient,
                  ]);
                  setIsVisible(false);
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
      <View style={styles.rowTextIcon}>
        <Text style={styles.ingredientText}>{t('recipe.Ingredients')}</Text>
        <Icon
          name={IconName.ADD}
          style={styles.addIcon}
          size={20}
          color="white"
          onPress={() => setIsVisible(true)}
        />
      </View>
      <View style={styles.list}>
        <ScrollView nestedScrollEnabled>
          {ingredientList.length == 0 ? (
            <Text>{t('recipe.AddIngredientsToList')}</Text>
          ) : (
            ingredientList.map(ingredient => (
              <View style={styles.item} key={ingredient.sallingProdId}>
                <Avatar.Image
                  style={styles.avatar}
                  size={30}
                  source={{
                    uri: ingredient.imgUrl ?? '',
                  }}
                />
                <Text numberOfLines={2} style={styles.itemText}>
                  {ingredient.name}, {ingredient.amount}
                </Text>
                <Icon
                  style={styles.icon}
                  name={IconName.DELETE}
                  size={25}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    setIngredientList(
                      ingredientList.filter(
                        item => item.sallingProdId !== ingredient.sallingProdId,
                      ),
                    );
                  }}
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <View style={styles.rowTextIcon}>
        <TextInput
          label={t('recipe.Direction')}
          mode="outlined"
          selectionColor={Colors.PRIMARY}
          activeOutlineColor={Colors.PRIMARY}
          style={styles.textinputFlex}
          onChangeText={text => setStepDirection({direction: text})}
          value={stepDirection.direction}
        />
        <Icon
          name={IconName.ADD}
          style={styles.addIconStep}
          size={20}
          color="white"
          onPress={() => {
            setDirectionsList(oldDirectionsList => [
              ...oldDirectionsList,
              {direction: stepDirection.direction},
            ]);
            setStepDirection({direction: ''});
          }}
        />
      </View>
      <View style={styles.list}>
        <ScrollView nestedScrollEnabled>
          {directionsList.length == 0 ? (
            <Text>{t('recipe.AddDirectionToList')}</Text>
          ) : (
            directionsList.map((direction, index) => (
              <View style={styles.item} key={index}>
                <Avatar.Text
                  style={styles.avatar}
                  size={30}
                  label={(index + 1).toString()}
                />
                <Text numberOfLines={2} style={styles.itemText}>
                  {direction.direction}
                </Text>
                <Icon
                  style={styles.icon}
                  name={IconName.DELETE}
                  size={25}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    directionsList.splice(index, 1);
                    setDirectionsList([...directionsList]);
                  }}
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <Button
        icon="image-plus"
        mode="contained"
        onPress={() => {}}
        style={styles.addimageButton}>
        {t('recipe.AddImage')}
      </Button>
      <View style={styles.rowMargin}>
        <Button
          mode="contained"
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          {t('recipe.Cancel')}
        </Button>
        <Button
          mode="contained"
          style={styles.createButton}
          onPress={() => {
            navigation.goBack();
            addRecipe({
              variables: {
                input: {
                  name: name,
                  description: description,
                  isPublic: !isPublic,
                  timeToMake: parseInt(timeToMake),
                  servings: parseInt(servings),
                  imgUrl:
                    'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
                  ingredientsList: ingredientList,
                  directionsList: directionsList,
                },
              },
            })
              .then(() =>
                setStatus({
                  showToast: true,
                  statusMsg: t('status.AddRecipe'),
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
          }}>
          {t('recipe.Add')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowMargin: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cancelButton: {borderRadius: 25, backgroundColor: Colors.PRIMARY},
  createButton: {
    marginLeft: 'auto',
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
  },
  addimageButton: {
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 20,
  },
  addIconStep: {
    marginLeft: 10,
    marginRight: 3,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    padding: 5,
    elevation: 4,
    marginBottom: -15,
  },
  itemText: {
    marginRight: 50,
  },
  ingredientText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowTextIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  addingredientbutton: {
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
  },
  textinputTimeToMake: {
    marginTop: 10,
    flex: 1,
    marginRight: 10,
  },
  textinputFlex: {
    marginTop: 10,
    flex: 1,
  },
  switch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
    backgroundColor: Colors.PRIMARY,
  },
  list: {
    borderWidth: 1,
    height: 200,
  },
  icon: {
    marginLeft: 'auto',
    marginTop: 5,
  },
  addIcon: {
    marginLeft: 'auto',
    marginRight: 3,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    padding: 5,
    elevation: 4,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollview: {
    flexGrow: 1,
  },
  textinput: {
    marginTop: 10,
  },
  sideMenuStyle: {
    flex: 1,
    margin: '10%',
    marginVertical: '30%',
  },
  safeAreaView: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonLabel: {
    color: 'green',
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default AddRecipeScreen;
