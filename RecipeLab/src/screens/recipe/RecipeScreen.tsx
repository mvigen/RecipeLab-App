import {gql, useQuery} from '@apollo/client';
import {t} from 'i18next';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Drawer from '../../components/Drawer/Drawer';
import RecipeCardList from '../../components/RecipeCardList/RecipeList';
import {Colors} from '../../enums/enums';
import {Recipes} from '../../graphql/__generated__/Recipes';
import {statusType, userContext} from '../../userContext';
import {useTranslation} from 'react-i18next';

export const RECIPE_QUERY = gql`
  query Recipes($input: RecipeFilterInput) {
    recipes(where: $input) {
      name
      id
      imgUrl
      likeCounter
    }
  }
`;

const RecipeScreen = () => {
  const {isDrawerOpen, setIsDrawerOpen, isSignedIn, setStatus} =
    useContext(userContext);
  const [searchword, setSearchword] = useState('');
  const {t} = useTranslation();

  const {data, refetch} = useQuery<Recipes>(RECIPE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    refetch();
  }, [isSignedIn]);

  useEffect(() => {
    refetch({
      input: {
        hideFromQuery: {eq: false},
        or: [
          {name: {contains: searchword}},
          {description: {contains: searchword}},
          {ingredients: {some: {name: {contains: searchword}}}},
          {
            ingredients: {
              some: {description: {contains: searchword}},
            },
          },
          {creator: {name: {contains: searchword}}},
        ],
      },
    }).catch(e =>
      setStatus({
        statusMsg: e.message,
        showToast: true,
        type: statusType.ERROR,
      }),
    );
  }, [searchword]);

  return (
    <View style={styles.container}>
      <Searchbar
        selectionColor={Colors.PRIMARY}
        value={searchword}
        onChangeText={text => setSearchword(text)}
        style={styles.searchbar}
        placeholder={t('recipe.SearchRecipe')}
      />
      <RecipeCardList Recipes={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    color: Colors.PRIMARY,
    borderRadius: 20,
    marginVertical: 10,
    borderColor: Colors.PRIMARY,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default RecipeScreen;
