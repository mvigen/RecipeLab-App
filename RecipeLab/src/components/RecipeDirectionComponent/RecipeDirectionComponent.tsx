import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Card, List} from 'react-native-paper';
import {RecipeDetailsQuery_recipe_directions} from '../../graphql/__generated__/RecipeDetailsQuery';
import RecipeStepComponent from '../RecipeStepComponent/RecipeStepComponent';
import {useTranslation} from 'react-i18next';

export type Props = {
  directions:
    | (RecipeDetailsQuery_recipe_directions | null)[]
    | null
    | undefined;
};

const RecipeDirectionComponent = ({directions}: Props) => {
  const {t} = useTranslation();
  return (
    <Card style={styles.directions}>
      <Card.Title title={t('recipe.Directions')} />
      {directions?.map((direction, index) => (
        <RecipeStepComponent
          key={direction?.id}
          direction={direction}
          stepNumber={index + 1}
        />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  directions: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default RecipeDirectionComponent;
