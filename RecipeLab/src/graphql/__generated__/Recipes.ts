/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Recipes
// ====================================================

export interface Recipes_recipes {
  __typename: "Recipe";
  name: string | null;
  id: string | null;
  imgUrl: string | null;
  likeCounter: number;
}

export interface Recipes {
  recipes: (Recipes_recipes | null)[] | null;
}

export interface RecipesVariables {
  input?: RecipeFilterInput | null;
}
