/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveShoppingListItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: removeItemFromShoppingList
// ====================================================

export interface removeItemFromShoppingList_removeItemFromShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface removeItemFromShoppingList_removeItemFromShoppingList {
  __typename: "PayloadBaseOfUser";
  data: removeItemFromShoppingList_removeItemFromShoppingList_data | null;
}

export interface removeItemFromShoppingList {
  removeItemFromShoppingList: removeItemFromShoppingList_removeItemFromShoppingList | null;
}

export interface removeItemFromShoppingListVariables {
  input?: RemoveShoppingListItemInput | null;
}
