/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShoppingListNames
// ====================================================

export interface ShoppingListNames_user_allShoppingLists {
  __typename: "ShoppingList";
  name: string | null;
  isActive: boolean;
  id: string | null;
}

export interface ShoppingListNames_user {
  __typename: "User";
  allShoppingLists: (ShoppingListNames_user_allShoppingLists | null)[] | null;
}

export interface ShoppingListNames {
  user: ShoppingListNames_user | null;
}
