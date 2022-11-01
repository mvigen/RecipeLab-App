/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateLikeCounterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeRecipeCard
// ====================================================

export interface likeRecipeCard_updateLikeCounter_data {
  __typename: "Recipe";
  id: string | null;
}

export interface likeRecipeCard_updateLikeCounter {
  __typename: "PayloadBaseOfRecipe";
  data: likeRecipeCard_updateLikeCounter_data | null;
}

export interface likeRecipeCard {
  updateLikeCounter: likeRecipeCard_updateLikeCounter | null;
}

export interface likeRecipeCardVariables {
  input?: UpdateLikeCounterInput | null;
}
