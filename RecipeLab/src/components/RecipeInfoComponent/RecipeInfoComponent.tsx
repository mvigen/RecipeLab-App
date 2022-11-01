import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import {Colors} from '../../enums/enums';
import {RecipeDetailsQuery_recipe} from '../../graphql/__generated__/RecipeDetailsQuery';
import {useTranslation} from 'react-i18next';

const RecipeInfoComponent = ({
  servings,
  timeToMake,
}: Pick<RecipeDetailsQuery_recipe, 'servings' | 'timeToMake'>) => {
  const {t} = useTranslation();

  return (
    <Card>
      <Card.Title
        title={t('recipe.TimeToMake')}
        titleStyle={
          timeToMake % 60 > 0 && timeToMake / 60 >= 1
            ? styles.title
            : styles.title2
        }
        style={styles.listItem}
        left={props => (
          <View style={styles.row}>
            {timeToMake / 60 >= 1 ? (
              <Text>{Math.floor(timeToMake / 60)} h</Text>
            ) : undefined}
            {timeToMake % 60 > 0 ? (
              <Text style={styles.labelstyle}>{timeToMake % 60} m</Text>
            ) : undefined}
          </View>
        )}
      />
      <Card.Title
        title={t('recipe.Servings')}
        titleStyle={
          timeToMake % 60 > 0 && timeToMake / 60 >= 1
            ? styles.title
            : styles.title2
        }
        left={props => (
          <Text style={styles.servings}>{servings.toString()}</Text>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  avatar: {backgroundColor: Colors.PRIMARY, marginLeft: 40},
  listItem: {
    marginBottom: -25,
  },
  title: {
    fontSize: 17,
    marginLeft: 20,
  },
  title2: {
    fontSize: 17,
    marginLeft: -5,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 0,
  },
  labelstyle: {
    marginLeft: 5,
  },
  servings: {
    marginLeft: 5,
  },
});

export default RecipeInfoComponent;
