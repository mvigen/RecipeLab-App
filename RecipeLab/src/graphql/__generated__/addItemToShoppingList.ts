/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddShoppingListItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addItemToShoppingList
// ====================================================

export interface addItemToShoppingList_addItemToShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface addItemToShoppingList_addItemToShoppingList {
  __typename: "PayloadBaseOfUser";
  data: addItemToShoppingList_addItemToShoppingList_data | null;
}

export interface addItemToShoppingList {
  addItemToShoppingList: addItemToShoppingList_addItemToShoppingList | null;
}

export interface addItemToShoppingListVariables {
  input?: AddShoppingListItemInput | null;
}
