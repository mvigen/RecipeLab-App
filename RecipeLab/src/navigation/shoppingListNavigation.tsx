import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import LoginButton from '../components/LoginButton/LoginButton';
import AddShoppingListScreen from '../screens/AddShoppingListScreen';
import EditShoppingListScreen from '../screens/EditShoppingList';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import {RootStackParamList} from './types';

const ShoppingListStack = createStackNavigator<RootStackParamList>();

export default function ShoppingListStackScreen() {
  const {t} = useTranslation();

  return (
    <ShoppingListStack.Navigator
      screenOptions={{
        headerRight: () => <LoginButton />,
      }}>
      <ShoppingListStack.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{title: t('navigation.ShoppingList')}}
      />
      <ShoppingListStack.Screen
        name="AddShoppingList"
        component={AddShoppingListScreen}
        options={{title: t('drawer.AddShoppingList')}}
      />
      <ShoppingListStack.Screen
        name="EditShoppingList"
        component={EditShoppingListScreen}
        options={{title: t('shoppingList.EditShoppingList')}}
      />
    </ShoppingListStack.Navigator>
  );
}
