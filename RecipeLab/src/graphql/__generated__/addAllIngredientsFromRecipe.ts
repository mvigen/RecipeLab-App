/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddAllIngredientsFromRecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addAllIngredientsFromRecipe
// ====================================================

export interface addAllIngredientsFromRecipe_addAllIngredientsFromRecipe_data {
  __typename: "User";
  id: string | null;
}

export interface addAllIngredientsFromRecipe_addAllIngredientsFromRecipe {
  __typename: "PayloadBaseOfUser";
  data: addAllIngredientsFromRecipe_addAllIngredientsFromRecipe_data | null;
}

export interface addAllIngredientsFromRecipe {
  addAllIngredientsFromRecipe: addAllIngredientsFromRecipe_addAllIngredientsFromRecipe | null;
}

export interface addAllIngredientsFromRecipeVariables {
  input?: AddAllIngredientsFromRecipeInput | null;
}
