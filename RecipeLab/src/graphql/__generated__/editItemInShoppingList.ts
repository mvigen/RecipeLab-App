/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditShoppingListItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editItemInShoppingList
// ====================================================

export interface editItemInShoppingList_editItemInShoppingList_data {
  __typename: "User";
  id: string | null;
}

export interface editItemInShoppingList_editItemInShoppingList {
  __typename: "PayloadBaseOfUser";
  data: editItemInShoppingList_editItemInShoppingList_data | null;
}

export interface editItemInShoppingList {
  editItemInShoppingList: editItemInShoppingList_editItemInShoppingList | null;
}

export interface editItemInShoppingListVariables {
  input?: EditShoppingListItemInput | null;
}
