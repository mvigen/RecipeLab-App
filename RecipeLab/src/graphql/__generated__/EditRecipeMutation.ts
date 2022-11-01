/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditRecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditRecipeMutation
// ====================================================

export interface EditRecipeMutation_editRecipe_data {
  __typename: "Recipe";
  name: string | null;
}

export interface EditRecipeMutation_editRecipe {
  __typename: "PayloadBaseOfRecipe";
  data: EditRecipeMutation_editRecipe_data | null;
}

export interface EditRecipeMutation {
  editRecipe: EditRecipeMutation_editRecipe | null;
}

export interface EditRecipeMutationVariables {
  input?: EditRecipeInput | null;
}
