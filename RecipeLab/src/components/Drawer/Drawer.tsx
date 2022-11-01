import CookieManager from '@react-native-cookies/cookies';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useContext} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import {Colors, IconName, Screens} from '../../enums/enums';
import {statusType, userContext} from '../../userContext';
import DrawerButton from '../Button/Button';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {gql, useMutation, useQuery} from '@apollo/client';
import {ShoppingListNames} from '../../graphql/__generated__/ShoppingListNames';
import {SHOPPINGLIST_QUERY} from '../../screens/ShoppingListScreen';
import {
  DeleteShoppingListInput,
  EditShoppingListInput,
} from '../../graphql/__generated__/globalTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const SHOPPINGLIST_NAMES_QUERY = gql`
  query ShoppingListNames {
    user {
      allShoppingLists {
        name
        isActive
        id
      }
    }
  }
`;

export const EDIT_SHOPPINGLIST = gql`
  mutation editShoppingList($input: EditShoppingListInput) {
    editShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const DELETE_SHOPPINGLIST = gql`
  mutation deleteShoppingList($input: DeleteShoppingListInput) {
    deleteShoppingList(input: $input) {
      data {
        id
      }
    }
  }
`;

const Drawer = () => {
  const {
    setIsSignedin,
    setIsDrawerOpen,
    currentScreen,
    isDrawerOpen,
    setStatus,
  } = useContext(userContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
  const {data} = useQuery<ShoppingListNames>(SHOPPINGLIST_NAMES_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [editShoppingList] = useMutation<EditShoppingListInput>(
    EDIT_SHOPPINGLIST,
    {
      refetchQueries: [
        {query: SHOPPINGLIST_QUERY},
        {query: SHOPPINGLIST_NAMES_QUERY},
      ],
    },
  );
  const [deleteShoppingList] = useMutation<DeleteShoppingListInput>(
    DELETE_SHOPPINGLIST,
    {
      refetchQueries: [SHOPPINGLIST_NAMES_QUERY, 'ShoppingListNames'],
    },
  );

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      CookieManager.clearAll();
      CookieManager.flush();
      setIsSignedin(false);
      setIsDrawerOpen(false);
      navigation.navigate('Recipe');
    } catch (error) {}
  };

  return (
    <Modal
      isVisible={isDrawerOpen}
      onBackdropPress={() => {
        setIsDrawerOpen(!isDrawerOpen);
      }}
      onSwipeComplete={() => {
        setIsDrawerOpen(!isDrawerOpen);
      }}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      swipeDirection="right"
      useNativeDriver
      hideModalContentWhileAnimating
      propagateSwipe
      style={styles.sideMenuStyle}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Button
            color="white"
            onPress={() => {
              signOut();
            }}
            style={styles.button}>
            {t('drawer.Logout')}
          </Button>
          {currentScreen == Screens.RECIPE ? (
            <View>
              <DrawerButton
                onPress={() => {
                  navigation.navigate('AddRecipe');
                  setIsDrawerOpen(false);
                }}
                iconSize={30}
                iconColor={Colors.PRIMARY}
                text={t('drawer.AddRecipe')}></DrawerButton>
              <DrawerButton
                onPress={() => {
                  navigation.navigate('OwnRecipes');
                  setIsDrawerOpen(false);
                }}
                text={t('drawer.OwnRecipes')}
                iconName={IconName.RECIPEICON}
                iconSize={30}
                iconColor={Colors.PRIMARY}
                style={styles.ownRecipe}
              />
              <DrawerButton
                onPress={() => {
                  navigation.navigate('FavorisedRecipes');
                  setIsDrawerOpen(false);
                }}
                text={t('drawer.LikedRecipes')}
                iconName={IconName.FAVORITE}
                iconSize={30}
                iconColor={Colors.PRIMARY}
                style={styles.ownRecipe}
              />
            </View>
          ) : undefined}
          {currentScreen == Screens.SHOPPINGLIST ? (
            <View>
              <View style={styles.divider} />
              <Button
                color="white"
                onPress={() => {
                  navigation.navigate('AddShoppingList');
                  setIsDrawerOpen(false);
                }}
                style={styles.addShoppingList}>
                {t('drawer.AddShoppingList')}
              </Button>
              {data?.user?.allShoppingLists?.map(item => (
                <View style={styles.row}>
                  <DrawerButton
                    onPress={() => {
                      setIsDrawerOpen(false);
                      editShoppingList({
                        variables: {
                          input: {
                            shoppingListId: item?.id,
                            isActive: true,
                          },
                        },
                      })
                        .then()
                        .catch(e =>
                          setStatus({
                            showToast: true,
                            statusMsg: e.message,
                            type: statusType.ERROR,
                          }),
                        );
                    }}
                    text={item?.name}
                    iconName={IconName.SHOPPINGLISTICON}
                    iconSize={30}
                    iconColor={
                      item?.isActive == true ? Colors.PRIMARY : undefined
                    }
                    style={styles.ShoppingListButton}
                  />
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.deleteIcon}
                      size={25}
                      name={IconName.EDIT}
                      onPress={() => {
                        navigation.navigate('EditShoppingList', {
                          shoppingListId: item?.id,
                          name: item?.name,
                          isActive: item?.isActive,
                        });
                        setIsDrawerOpen(false);
                      }}
                    />
                    {item?.isActive == false ? (
                      <Icon
                        style={styles.deleteIcon}
                        size={25}
                        name={IconName.DELETE}
                        onPress={() =>
                          deleteShoppingList({
                            variables: {
                              input: {
                                shoppingListId: item?.id,
                              },
                            },
                          }).catch(e =>
                            setStatus({
                              showToast: true,
                              statusMsg: e.message,
                              type: statusType.ERROR,
                            }),
                          )
                        }
                      />
                    ) : undefined}
                  </View>
                </View>
              ))}
            </View>
          ) : undefined}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  ShoppingListButton: {
    marginTop: 10,
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
  addShoppingList: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginTop: 10,
  },
  divider: {
    borderWidth: 0.5,
    opacity: 0.2,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  sideMenuStyle: {
    flex: 1,
    margin: 0,
    marginLeft: '25%',
  },
  ownRecipe: {marginTop: 10},
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    margin: 12,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonLabel: {
    color: Colors.PRIMARY,
  },
});
