import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {Colors} from '../../enums/enums';
import {RecipeDetailsQuery_recipe_directions} from '../../graphql/__generated__/RecipeDetailsQuery';
import {useTranslation} from 'react-i18next';

export type Props = {
  direction: RecipeDetailsQuery_recipe_directions | null | undefined;
  stepNumber: number;
};

const RecipeStepComponent = ({direction, stepNumber}: Props) => {
  const {t} = useTranslation();
  return (
    <View>
      <List.Item
        key={direction?.id}
        style={styles.stepItem}
        title={t('recipe.Step') + ' ' + stepNumber}
        titleStyle={styles.stepText}
        left={props => (
          <Avatar.Text {...props} style={styles.avatar} size={15} label="" />
        )}
      />
      <List.Item
        titleNumberOfLines={10}
        title={direction?.direction}
        style={styles.directionText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepItem: {paddingBottom: 0},
  stepText: {fontWeight: 'bold'},
  avatar: {
    marginLeft: 10,
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  directionText: {marginLeft: 25, marginTop: -15},
});

export default RecipeStepComponent;
