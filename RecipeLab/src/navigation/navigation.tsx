import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipeDetailsScreen from '../screens/recipe/RecipeDetailsScreen';
import RecipeScreen from '../screens/recipe/RecipeScreen';
import {RootStackParamList} from './types';
import AddRecipeScreen from '../screens/recipe/AddRecipeScreen';
import {useTranslation} from 'react-i18next';
import EditRecipeScreen from '../screens/recipe/EditRecipeScreen';
import LoginButton from '../components/LoginButton/LoginButton';
import OwnRecipeScreen from '../screens/recipe/OwnRecipeScreen';
import FavorisedRecipeScreen from '../screens/recipe/FavorisedRecipeScreen';

const RecipeStack = createStackNavigator<RootStackParamList>();

export default function RecipeStackScreen() {
  const {t} = useTranslation();

  return (
    <RecipeStack.Navigator
      screenOptions={{
        headerRight: () => <LoginButton />,
      }}>
      <RecipeStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{title: t('navigation.Recipes')}}
      />
      <RecipeStack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{
          title: ' ',
          headerTitleStyle: {maxWidth: 230, marginLeft: -20},
        }}
      />
      <RecipeStack.Screen
        name="EditRecipe"
        component={EditRecipeScreen}
        options={{title: t('navigation.EditRecipe')}}
      />
      <RecipeStack.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{title: t('drawer.AddRecipe')}}
      />
      <RecipeStack.Screen
        name="OwnRecipes"
        component={OwnRecipeScreen}
        options={{title: t('drawer.OwnRecipes')}}
      />
      <RecipeStack.Screen
        name="FavorisedRecipes"
        component={FavorisedRecipeScreen}
        options={{title: t('drawer.LikedRecipes')}}
      />
    </RecipeStack.Navigator>
  );
}
