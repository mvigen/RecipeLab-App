import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, List} from 'react-native-paper';
import {RecipeDetailsQuery_recipe_ingredients} from '../../graphql/__generated__/RecipeDetailsQuery';
import {Colors} from '../../enums/enums';
import {useTranslation} from 'react-i18next';

interface Props {
  ingredients:
    | (RecipeDetailsQuery_recipe_ingredients | null)[]
    | null
    | undefined;
}

const RecipeIngredientList = ({ingredients}: Props) => {
  const {t} = useTranslation();
  return (
    <Card style={styles.card}>
      <Card.Title title={t('recipe.Ingredients')} />
      {ingredients?.map(item => (
        <List.Item
          key={item?.id}
          title={item?.name}
          titleStyle={styles.title}
          descriptionStyle={styles.title}
          description={item?.amount}
          left={props => (
            <Avatar.Image
              {...props}
              style={styles.avatar}
              size={30}
              source={{
                uri: item?.imgUrl ?? '',
              }}
            />
          )}
        />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
  },
  card: {
    marginTop: 10,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY,
  },
});

export default RecipeIngredientList;
