import {gql, useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Snackbar,
  Text,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, IconName} from '../../enums/enums';
import {AddAllIngredientsFromRecipeInput} from '../../graphql/__generated__/globalTypes';
import {likeRecipeCardVariables} from '../../graphql/__generated__/likeRecipeCard';
import {RootStackParamList} from '../../navigation/types';
import {SHOPPINGLIST_QUERY} from '../../screens/ShoppingListScreen';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {statusType, userContext} from '../../userContext';
import {RECIPE_QUERY} from '../../screens/recipe/RecipeScreen';
import {LikedRecipesQuery} from '../../graphql/__generated__/LikedRecipesQuery';
import {RECIPE_DETAILS_QUERY} from '../../screens/recipe/RecipeDetailsScreen';

interface IRecipeCardProps {
  id: string | null | undefined;
  likes?: number;
  title: string | null | undefined;
  imgUrl: string | null | undefined;
  name: string | null | undefined;
}

export const LIKE_RECIPE = gql`
  mutation likeRecipeCard($input: UpdateLikeCounterInput) {
    updateLikeCounter(input: $input) {
      data {
        id
      }
    }
  }
`;

export const LIKED_RECIPES_QUERY = gql`
  query LikedRecipesQuery {
    user {
      likedRecipes {
        id
      }
    }
  }
`;

export const ADD_RECIPE_SHOPPING_LIST = gql`
  mutation addAllIngredientsFromRecipe(
    $input: AddAllIngredientsFromRecipeInput
  ) {
    addAllIngredientsFromRecipe(input: $input) {
      data {
        id
      }
    }
  }
`;

const RecipeCard = ({id, title, imgUrl, likes, name}: IRecipeCardProps) => {
  const [isFavorized, setIsFavorized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {setStatus} = useContext(userContext);
  const [likeRecipe] = useMutation<likeRecipeCardVariables>(LIKE_RECIPE, {
    variables: {input: {recipeId: id}},
    refetchQueries: [
      {query: RECIPE_DETAILS_QUERY, variables: {id: id}},
      {query: RECIPE_QUERY},
      {query: LIKED_RECIPES_QUERY},
    ],
  });
  const {t} = useTranslation();

  const [addRecipe] = useMutation<AddAllIngredientsFromRecipeInput>(
    ADD_RECIPE_SHOPPING_LIST,
    {
      refetchQueries: [SHOPPINGLIST_QUERY, 'ShoppingList'],
    },
  );
  const {data} = useQuery<LikedRecipesQuery>(LIKED_RECIPES_QUERY);
  useEffect(() => {
    setIsFavorized(
      data?.user?.likedRecipes?.find(item => item?.id === id)?.id === id
        ? true
        : false,
    );
  }, [data]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('RecipeDetails', {id: id, name: name});
      }}>
      <Card.Cover
        style={styles.img}
        source={{
          uri: imgUrl ?? '',
        }}
      />
      <Card.Content>
        <Title numberOfLines={2}>{title}</Title>
      </Card.Content>
      <Card.Actions>
        <Icon
          name={isFavorized ? IconName.FAVORITE : IconName.FAVORITEBORDER}
          size={30}
          color={Colors.PRIMARY}
          onPress={() => {
            likeRecipe()
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
                  statusMsg: t('status.LoginToLike'),
                  type: statusType.ERROR,
                }),
              );
            setIsFavorized(!isFavorized);
          }}></Icon>
        <Paragraph style={styles.paragraph}>{likes}</Paragraph>
        <Icon
          name={IconName.RECIPEADD}
          size={30}
          color={Colors.PRIMARY}
          style={{marginLeft: 'auto'}}
          onPress={() => {
            setIsVisible(true);
          }}></Icon>
      </Card.Actions>
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
                addRecipe({variables: {input: {recipeId: id}}})
                  .then(() =>
                    setStatus({
                      showToast: true,
                      statusMsg: t('status.AddRecipeToShoppingList'),
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
                setIsVisible(false);
              }}>
              {t('shoppingList.AddToShoppinglist')}
            </Button>
          </View>
        </SafeAreaView>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  toast: {
    margin: 0,
    transform: [{translateY: 0, translateX: 0}],
    width: '150%',
  },
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
  paragraph: {
    marginLeft: 5,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    maxWidth: '47.5%',
  },
  img: {
    height: 100,
  },
});

export default RecipeCard;
