/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditShoppingListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editShoppingList
// ====================================================

export interface editShoppingList_editShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface editShoppingList_editShoppingList {
  __typename: "PayloadBaseOfUser";
  data: editShoppingList_editShoppingList_data | null;
}

export interface editShoppingList {
  editShoppingList: editShoppingList_editShoppingList | null;
}

export interface editShoppingListVariables {
  input?: EditShoppingListInput | null;
}
