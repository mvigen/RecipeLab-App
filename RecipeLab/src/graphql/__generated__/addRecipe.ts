/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addRecipe
// ====================================================

export interface addRecipe_addRecipe_data {
  __typename: "Recipe";
  id: string | null;
}

export interface addRecipe_addRecipe {
  __typename: "PayloadBaseOfRecipe";
  data: addRecipe_addRecipe_data | null;
}

export interface addRecipe {
  addRecipe: addRecipe_addRecipe | null;
}

export interface addRecipeVariables {
  input?: AddRecipeInput | null;
}
