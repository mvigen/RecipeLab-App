/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShoppingList
// ====================================================

export interface ShoppingList_user_activeShoppingList_ingredients {
  __typename: "Ingredient";
  name: string | null;
  amount: string | null;
  isMarked: boolean;
  imgUrl: string | null;
  id: string | null;
}

export interface ShoppingList_user_activeShoppingList {
  __typename: "ShoppingList";
  name: string | null;
  ingredients: (ShoppingList_user_activeShoppingList_ingredients | null)[] | null;
}

export interface ShoppingList_user {
  __typename: "User";
  activeShoppingList: ShoppingList_user_activeShoppingList | null;
}

export interface ShoppingList {
  user: ShoppingList_user | null;
}
