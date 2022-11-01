import React, {useContext, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  TextInput,
  Title,
} from 'react-native-paper';
import {Colors, IconName} from '../../enums/enums';
import {ShoppingList_user_shoppingList} from '../../graphql/__generated__/ShoppingList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {gql, useMutation} from '@apollo/client';
import Modal from 'react-native-modal';
import {
  EditShoppingListItemInput,
  RemoveShoppingListItemInput,
  ToggleIsMarkedInput,
} from '../../graphql/__generated__/globalTypes';
import {SHOPPINGLIST_QUERY} from '../../screens/ShoppingListScreen';
import {Swipeable} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {statusType, userContext} from '../../userContext';

interface Props {
  ingredient: ShoppingList_user_shoppingList | undefined | null;
}

const TOGGLE_IS_MARKED = gql`
  mutation toggleIsMarked($input: ToggleIsMarkedInput) {
    toggleIsMarked(input: $input) {
      data {
        id
      }
    }
  }
`;

export const REMOVE_INGREDIENT = gql`
  mutation removeItemFromShoppingList($input: RemoveShoppingListItemInput) {
    removeItemFromShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const EDIT_INGREDIENT = gql`
  mutation editItemInShoppingList($input: EditShoppingListItemInput) {
    editItemInShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const ShoppingListListItem = ({ingredient}: Props) => {
  const [toggleIsMarked] = useMutation<ToggleIsMarkedInput>(TOGGLE_IS_MARKED, {
    refetchQueries: [SHOPPINGLIST_QUERY, 'ShoppingList'],
  });
  const [editIngredient] = useMutation<EditShoppingListItemInput>(
    EDIT_INGREDIENT,
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

  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [name, setName] = useState(ingredient?.name);
  const [amount, setAmount] = useState(ingredient?.amount);
  const swipeableRef = useRef<any>();
  const {setStatus} = useContext(userContext);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  };
  const {t} = useTranslation();

  const leftSwipeActions = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <Icon
          name={IconName.EDIT}
          style={styles.Icon}
          size={20}
          color="white"
          onPress={() => setIsEditVisible(true)}
        />
        <Icon
          name={IconName.DELETE}
          style={[styles.Icon, {backgroundColor: 'red'}]}
          size={20}
          color="white"
          onPress={() => setIsVisible(true)}
        />
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false);
            closeSwipeable();
          }}
          onSwipeComplete={() => {
            setIsVisible(false);
            closeSwipeable();
          }}
          animationIn="zoomIn"
          animationOut="zoomOut"
          swipeDirection="right"
          useNativeDriver
          hideModalContentWhileAnimating
          propagateSwipe
          style={styles.modal}>
          <SafeAreaView style={styles.safeAreaViewDelete}>
            <Text style={styles.text}>
              {t('shoppingList.DeleteIngredient')}
            </Text>
            <View style={styles.rowMargin}>
              <Button
                mode="contained"
                style={styles.cancelButton}
                onPress={() => {
                  setIsVisible(false);
                  closeSwipeable();
                }}>
                {t('recipe.Cancel')}
              </Button>
              <Button
                mode="contained"
                style={styles.deleteButton}
                onPress={() => {
                  removeItems({
                    variables: {
                      input: {
                        ingredientIdList: [ingredient?.id],
                      },
                    },
                  })
                    .then(() =>
                      setStatus({
                        showToast: true,
                        statusMsg: t('status.RemoveIngredient'),
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
          isVisible={isEditVisible}
          onBackdropPress={() => {
            setIsEditVisible(false);
            closeSwipeable();
          }}
          onSwipeComplete={() => {
            setIsEditVisible(false);
            closeSwipeable();
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
                  setIsEditVisible(false);
                  setName(ingredient?.name);
                  setAmount(ingredient?.amount);
                  closeSwipeable();
                }}
                size={25}
                style={styles.icon}
                name={IconName.REMOVE}
              />
              <TextInput
                value={name == null || undefined ? '' : name}
                label={t('shoppingList.Name')}
                mode="outlined"
                activeOutlineColor={Colors.PRIMARY}
                style={styles.textinput}
                onChangeText={text => setName(text)}
              />
              <TextInput
                value={amount == null || undefined ? '' : amount}
                label={t('recipe.Amount')}
                mode="outlined"
                activeOutlineColor={Colors.PRIMARY}
                style={styles.textinput}
                onChangeText={text => setAmount(text)}
              />
              <Button
                onPress={() => {
                  editIngredient({
                    variables: {
                      input: {
                        id: ingredient?.id,
                        name: name,
                        amount: amount,
                      },
                    },
                  })
                    .then(() =>
                      setStatus({
                        showToast: true,
                        statusMsg: t('status.EditIngredient'),
                        type: statusType.SUCCESS,
                      }),
                    )
                    .catch(e => {
                      setStatus({
                        showToast: true,
                        statusMsg: e.message,
                        type: statusType.ERROR,
                      });
                    });
                  setIsEditVisible(false);
                  closeSwipeable();
                }}
                mode="contained"
                style={styles.addingredientbutton}>
                {t('shoppingList.EditIngredient')}
              </Button>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };
  return (
    <Swipeable ref={swipeableRef} renderRightActions={leftSwipeActions}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Avatar.Image
            style={styles.avatar}
            size={30}
            source={{
              uri: ingredient?.imgUrl ?? '',
            }}
          />
          <View style={styles.textContainer}>
            <Title
              style={[
                styles.nameText,
                ingredient?.isMarked ? styles.checked : undefined,
              ]}
              numberOfLines={1}>
              {ingredient?.name}
            </Title>
            <Title
              style={[
                styles.amountText,
                ingredient?.isMarked ? styles.checked : undefined,
              ]}
              numberOfLines={1}>
              {ingredient?.amount}
            </Title>
          </View>
          <View style={styles.buttons}>
            <View style={styles.checkbox}>
              <Checkbox
                color={Colors.PRIMARY}
                status={ingredient?.isMarked ? 'checked' : 'unchecked'}
                onPress={() => {
                  toggleIsMarked({
                    variables: {
                      input: {
                        ingredientId: ingredient?.id,
                      },
                    },
                  })
                    .then(() =>
                      setStatus({
                        showToast: true,
                        statusMsg: t('status.LikedRecipe'),
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
                }}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

export default ShoppingListListItem;

const styles = StyleSheet.create({
  safeAreaViewDelete: {
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  addingredientbutton: {
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
  },
  textinput: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginLeft: 'auto',
    marginTop: 5,
  },
  addModal: {
    flex: 1,
    margin: '10%',
    marginVertical: '30%',
  },
  text: {margin: 20, alignItems: 'center'},
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
    height: 250,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    margin: '10%',
    marginVertical: '80%',
  },
  Icon: {
    flexGrow: 0,
    marginLeft: 'auto',
    marginRight: 3,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    padding: 5,
    elevation: 4,
    alignSelf: 'center',
  },
  checked: {
    textDecorationLine: 'line-through',
    color: 'grey',
    opacity: 0.7,
  },
  buttons: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  checkbox: {
    alignItems: 'center',
  },
  amountText: {
    fontSize: 15,
  },
  nameText: {
    fontSize: 15,
    marginBottom: -10,
    marginRight: 60,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginVertical: -10,
  },
  content: {
    flexDirection: 'row',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  paragraph: {
    marginLeft: 5,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 15,
  },
});
