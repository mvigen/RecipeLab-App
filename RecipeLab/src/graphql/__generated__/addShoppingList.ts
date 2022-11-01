/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddShoppingListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addShoppingList
// ====================================================

export interface addShoppingList_addShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface addShoppingList_addShoppingList {
  __typename: "PayloadBaseOfUser";
  data: addShoppingList_addShoppingList_data | null;
}

export interface addShoppingList {
  addShoppingList: addShoppingList_addShoppingList | null;
}

export interface addShoppingListVariables {
  input?: AddShoppingListInput | null;
}
