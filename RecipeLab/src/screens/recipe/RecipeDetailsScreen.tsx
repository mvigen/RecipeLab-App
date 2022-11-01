import {gql, useMutation, useQuery} from '@apollo/client';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import RecipeInfoComponent from '../../components/RecipeInfoComponent/RecipeInfoComponent';
import RecipeDirectionComponent from '../../components/RecipeDirectionComponent/RecipeDirectionComponent';
import RecipeIngredientList from '../../components/RecipeIngredientList/RecipeIngredientList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  RecipeDetailsQuery,
  RecipeDetailsQueryVariables,
} from '../../graphql/__generated__/RecipeDetailsQuery';
import {RecipeDetailsRouteProp} from '../../navigation/navigation';
import {Colors, IconName} from '../../enums/enums';
import {Button, Card} from 'react-native-paper';
import {likeRecipeDetailsVariables} from '../../graphql/__generated__/likeRecipeDetails';
import {RECIPE_QUERY} from './RecipeScreen';
import {statusType, userContext} from '../../userContext';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import EditButton from '../../components/EditButton/EditButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {
  ADD_RECIPE_SHOPPING_LIST,
  LIKED_RECIPES_QUERY,
} from '../../components/RecipeCard/RecipeCard';
import {AddAllIngredientsFromRecipeInput} from '../../graphql/__generated__/globalTypes';
import {SHOPPINGLIST_QUERY} from '../ShoppingListScreen';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {LikedRecipesQuery} from '../../graphql/__generated__/LikedRecipesQuery';

export const RECIPE_DETAILS_QUERY = gql`
  query RecipeDetailsQuery($id: String) {
    recipe(id: $id) {
      name
      description
      likeCounter
      servings
      timeToMake
      imgUrl
      ingredients {
        amount
        name
        id
        imgUrl
      }
      directions {
        direction
        id
      }
      creator {
        googleId
      }
    }
  }
`;

const LIKE_RECIPE = gql`
  mutation likeRecipeDetails($input: UpdateLikeCounterInput) {
    updateLikeCounter(input: $input) {
      data {
        id
      }
    }
  }
`;

const RecipeDetailsScreen = () => {
  const [isFavorized, setIsFavorized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {user, setStatus} = useContext(userContext);
  const {t} = useTranslation();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RootStackParamList, 'RecipeDetails'>>();
  const {data} = useQuery<RecipeDetailsQuery, RecipeDetailsQueryVariables>(
    RECIPE_DETAILS_QUERY,
    {variables: {id: route.params.id}},
  );

  const {data: likedRecipes} = useQuery<LikedRecipesQuery>(LIKED_RECIPES_QUERY);

  const [likeRecipe] = useMutation<likeRecipeDetailsVariables>(LIKE_RECIPE, {
    refetchQueries: [
      {query: RECIPE_DETAILS_QUERY, variables: {id: route.params.id}},
      {query: RECIPE_QUERY},
      {query: LIKED_RECIPES_QUERY},
    ],
    variables: {input: {recipeId: route.params.id}},
  });

  const [addRecipe] = useMutation<AddAllIngredientsFromRecipeInput>(
    ADD_RECIPE_SHOPPING_LIST,
    {
      refetchQueries: [SHOPPINGLIST_QUERY, 'ShoppingList'],
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title:
        data?.recipe?.name === null || data?.recipe?.name === undefined
          ? undefined
          : data?.recipe?.name,
    });
  }, [data]);

  useEffect(() => {
    setIsFavorized(
      likedRecipes?.user?.likedRecipes?.find(
        item => item?.id === route.params.id,
      )?.id === route.params.id
        ? true
        : false,
    );
  }, [likedRecipes]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Card style={{marginTop: 10}}>
          <Card.Cover source={{uri: data?.recipe?.imgUrl ?? ''}} />
          <Text style={styles.description}>{data?.recipe?.description}</Text>
        </Card>
        <View style={styles.likeShare}>
          <Icon
            size={30}
            name={isFavorized ? IconName.FAVORITE : IconName.FAVORITEBORDER}
            onPress={() => {
              likeRecipe()
                .then(() => {
                  setStatus({
                    showToast: true,
                    statusMsg: t('status.LikedRecipe'),
                    type: statusType.SUCCESS,
                  });
                  setIsFavorized(!isFavorized);
                })
                .catch(e =>
                  setStatus({
                    showToast: true,
                    statusMsg: t('status.LoginToLike'),
                    type: statusType.ERROR,
                  }),
                );
            }}
            color={Colors.PRIMARY}
          />
          <Text>{data?.recipe?.likeCounter}</Text>
          <Icon
            size={30}
            name={IconName.SHARE}
            onPress={() => {}}
            color={Colors.PRIMARY}
            style={styles.shareButton}
          />
          <Icon
            size={30}
            name={IconName.RECIPEADD}
            onPress={() => {
              setIsVisible(true);
            }}
            color={Colors.PRIMARY}
            style={styles.addButtonToShoppingList}
          />
          {user?.userInfo?.googleId === data?.recipe?.creator?.googleId ? (
            <View style={styles.row}>
              <DeleteButton recipeId={route.params.id} />
              <EditButton recipeId={route.params.id} />
            </View>
          ) : undefined}
        </View>

        <RecipeInfoComponent
          servings={data?.recipe?.servings ?? 0}
          timeToMake={data?.recipe?.timeToMake ?? 0}
        />
        <RecipeIngredientList ingredients={data?.recipe?.ingredients} />
        <RecipeDirectionComponent directions={data?.recipe?.directions} />
      </ScrollView>
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
        style={styles.modal}>
        <SafeAreaView style={styles.safeAreaViewDelete}>
          <Text style={styles.text}>
            {t('shoppingList.AddRecipeToShoppingList')}
          </Text>
          <View style={styles.rowMargin}>
            <Button
              mode="contained"
              style={styles.cancelButton}
              onPress={() => {
                setIsVisible(false);
              }}>
              {t('recipe.Cancel')}
            </Button>
            <Button
              mode="contained"
              style={styles.deleteButton}
              onPress={() => {
                addRecipe({
                  variables: {input: {recipeId: route.params.id}},
                })
                  .then(() =>
                    setStatus({
                      showToast: true,
                      statusMsg: t('status.AddRecipeToShoppingList'),
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
              {t('shoppingList.AddToShoppinglist')}
            </Button>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButton: {borderRadius: 25, backgroundColor: Colors.PRIMARY},
  deleteButton: {
    marginLeft: 'auto',
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
  },
  text: {margin: 20, alignItems: 'center'},
  safeAreaViewDelete: {
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  rowMargin: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  modal: {
    flex: 1,
    margin: '10%',
    marginVertical: '78%',
  },
  addButtonToShoppingList: {
    // marginHorizontal: 15,
    marginLeft: 'auto',
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    color: 'black',
    marginBottom: 10,
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  shareButton: {
    marginHorizontal: 15,
  },
  image: {width: '100%', height: 200, borderRadius: 10},
  likeShare: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  list: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default RecipeDetailsScreen;
