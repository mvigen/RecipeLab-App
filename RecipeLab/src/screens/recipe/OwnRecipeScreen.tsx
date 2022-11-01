import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RecipeCardList from '../../components/RecipeCardList/RecipeList';
import {OwnRecipesQuery} from '../../graphql/__generated__/OwnRecipesQuery';

export const OWN_RECIPES = gql`
  query OwnRecipesQuery {
    user {
      recipes(where: {hideFromQuery: {eq: false}}) {
        name
        id
        imgUrl
        likeCounter
      }
    }
  }
`;

const OwnRecipeScreen = () => {
  const {data} = useQuery<OwnRecipesQuery>(OWN_RECIPES);
  return (
    <View style={styles.container}>
      <RecipeCardList Recipes={data?.user} />
    </View>
  );
};

export default OwnRecipeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 10,
  },
});
