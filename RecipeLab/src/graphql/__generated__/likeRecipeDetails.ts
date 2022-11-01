/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateLikeCounterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeRecipeDetails
// ====================================================

export interface likeRecipeDetails_updateLikeCounter_data {
  __typename: "Recipe";
  id: string | null;
}

export interface likeRecipeDetails_updateLikeCounter {
  __typename: "PayloadBaseOfRecipe";
  data: likeRecipeDetails_updateLikeCounter_data | null;
}

export interface likeRecipeDetails {
  updateLikeCounter: likeRecipeDetails_updateLikeCounter | null;
}

export interface likeRecipeDetailsVariables {
  input?: UpdateLikeCounterInput | null;
}
