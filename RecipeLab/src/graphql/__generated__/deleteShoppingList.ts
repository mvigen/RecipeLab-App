/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteShoppingListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteShoppingList
// ====================================================

export interface deleteShoppingList_deleteShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface deleteShoppingList_deleteShoppingList {
  __typename: "PayloadBaseOfUser";
  data: deleteShoppingList_deleteShoppingList_data | null;
}

export interface deleteShoppingList {
  deleteShoppingList: deleteShoppingList_deleteShoppingList | null;
}

export interface deleteShoppingListVariables {
  input?: DeleteShoppingListInput | null;
}
