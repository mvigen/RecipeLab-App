/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveRecipeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteRecipeMutation
// ====================================================

export interface DeleteRecipeMutation_removeRecipe_data {
  __typename: "Recipe";
  name: string | null;
}

export interface DeleteRecipeMutation_removeRecipe {
  __typename: "PayloadBaseOfRecipe";
  data: DeleteRecipeMutation_removeRecipe_data | null;
}

export interface DeleteRecipeMutation {
  removeRecipe: DeleteRecipeMutation_removeRecipe | null;
}

export interface DeleteRecipeMutationVariables {
  input?: RemoveRecipeInput | null;
}
