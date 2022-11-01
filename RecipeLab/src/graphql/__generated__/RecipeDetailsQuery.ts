/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecipeDetailsQuery
// ====================================================

export interface RecipeDetailsQuery_recipe_ingredients {
  __typename: "Ingredient";
  amount: string | null;
  name: string | null;
  id: string | null;
  imgUrl: string | null;
}

export interface RecipeDetailsQuery_recipe_directions {
  __typename: "Step";
  direction: string | null;
  id: string | null;
}

export interface RecipeDetailsQuery_recipe_creator {
  __typename: "User";
  googleId: string | null;
}

export interface RecipeDetailsQuery_recipe {
  __typename: "Recipe";
  name: string | null;
  description: string | null;
  likeCounter: number;
  servings: number;
  timeToMake: number;
  imgUrl: string | null;
  ingredients: (RecipeDetailsQuery_recipe_ingredients | null)[] | null;
  directions: (RecipeDetailsQuery_recipe_directions | null)[] | null;
  creator: RecipeDetailsQuery_recipe_creator | null;
}

export interface RecipeDetailsQuery {
  recipe: RecipeDetailsQuery_recipe | null;
}

export interface RecipeDetailsQueryVariables {
  id?: string | null;
}
