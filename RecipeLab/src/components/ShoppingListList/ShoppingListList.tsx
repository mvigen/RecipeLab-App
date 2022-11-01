import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ShoppingList_user_activeShoppingList_ingredients} from '../../graphql/__generated__/ShoppingList';
import ShoppingListListItem from '../ShoppingListItem/ShoppingListItem';

interface Props {
  shoppingList:
    | (ShoppingList_user_activeShoppingList_ingredients | null)[]
    | null
    | undefined;
}

const ShoppingListList = ({shoppingList}: Props) => {
  const temp = shoppingList?.slice();
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={temp?.sort((a, b) =>
        a?.isMarked === b?.isMarked ? 0 : a?.isMarked ? 1 : -1,
      )}
      numColumns={1}
      renderItem={({item}) => <ShoppingListListItem ingredient={item} />}
    />
  );
};

export default ShoppingListList;

const styles = StyleSheet.create({
  container: {paddingTop: 5},
});
