import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, IconName, Screens} from '../enums/enums';
import {StyleSheet} from 'react-native';
import RecipeStackScreen from './navigation';
import {useTranslation} from 'react-i18next';
import ShoppingListStackScreen from './shoppingListNavigation';
import {userContext} from '../userContext';
import LoginButton from '../components/LoginButton/LoginButton';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const {t} = useTranslation();
  const {setCurrentScreen} = useContext(userContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarIconStyle: styles.icon,
        tabBarLabelStyle: styles.label,
      }}>
      <Tab.Screen
        name="Recipes"
        component={RecipeStackScreen}
        options={{
          title: t('navigation.Recipes'),
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={IconName.RECIPEICON} size={size} color={color} />
            );
          },
        }}
        listeners={{
          tabPress: () => {
            setCurrentScreen(Screens.RECIPE);
          },
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={ShoppingListStackScreen}
        options={{
          title: t('navigation.ShoppingList'),
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name={IconName.SHOPPINGLISTICON}
                size={size}
                color={color}
              />
            );
          },
        }}
        listeners={{
          tabPress: () => {
            setCurrentScreen(Screens.SHOPPINGLIST);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerRight: () => <LoginButton />,
          title: t('navigation.Profile'),
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={IconName.ACCOUNTICON} size={size} color={color} />
            );
          },
        }}
        listeners={{
          tabPress: () => {
            setCurrentScreen(Screens.PROFILE);
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -10,
  },
  label: {marginBottom: 5},
});

export default BottomNavigation;
