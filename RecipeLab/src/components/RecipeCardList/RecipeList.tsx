import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {LikedRecipesScreenQuery} from '../../graphql/__generated__/LikedRecipesScreenQuery';
import {OwnRecipesQuery_user} from '../../graphql/__generated__/OwnRecipesQuery';
import {Recipes} from '../../graphql/__generated__/Recipes';
import RecipeCard from '../RecipeCard/RecipeCard';

export type Props = {
  Recipes?: Recipes | undefined | null | OwnRecipesQuery_user;
  LikedRecipes?: LikedRecipesScreenQuery;
};

const RecipeCardList = ({Recipes, LikedRecipes}: Props) => {
  return (
    <FlatList
      columnWrapperStyle={styles.row}
      data={
        Recipes?.recipes != null || undefined
          ? Recipes?.recipes
          : LikedRecipes?.user?.likedRecipes
      }
      numColumns={2}
      renderItem={({item}) => (
        <RecipeCard
          name={item?.name}
          id={item?.id}
          title={item?.name}
          imgUrl={item?.imgUrl}
          likes={item?.likeCounter}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    marginBottom: 10,
  },
});

export default RecipeCardList;
