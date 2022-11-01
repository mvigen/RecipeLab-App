import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RecipeCardList from '../../components/RecipeCardList/RecipeList';
import {LikedRecipesScreenQuery} from '../../graphql/__generated__/LikedRecipesScreenQuery';

const LIKED_RECIPES_SCREEN_QUERY = gql`
  query LikedRecipesScreenQuery {
    user {
      likedRecipes {
        name
        id
        imgUrl
        likeCounter
      }
    }
  }
`;

const FavorisedRecipeScreen = () => {
  const {data} = useQuery<LikedRecipesScreenQuery>(LIKED_RECIPES_SCREEN_QUERY);

  return (
    <View style={styles.container}>
      <RecipeCardList LikedRecipes={data} />
    </View>
  );
};

export default FavorisedRecipeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
  },
});
