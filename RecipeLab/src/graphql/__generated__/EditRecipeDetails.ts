/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditRecipeDetails
// ====================================================

export interface EditRecipeDetails_recipe_ingredients {
  __typename: "Ingredient";
  name: string | null;
  imgUrl: string | null;
  amount: string | null;
  url: string | null;
  description: string | null;
  price: number | null;
  sallingProdId: string | null;
}

export interface EditRecipeDetails_recipe_directions {
  __typename: "Step";
  direction: string | null;
}

export interface EditRecipeDetails_recipe {
  __typename: "Recipe";
  id: string | null;
  name: string | null;
  description: string | null;
  imgUrl: string | null;
  timeToMake: number;
  servings: number;
  ingredients: (EditRecipeDetails_recipe_ingredients | null)[] | null;
  directions: (EditRecipeDetails_recipe_directions | null)[] | null;
  isPublic: boolean;
}

export interface EditRecipeDetails {
  recipe: EditRecipeDetails_recipe | null;
}

export interface EditRecipeDetailsVariables {
  id?: string | null;
}
