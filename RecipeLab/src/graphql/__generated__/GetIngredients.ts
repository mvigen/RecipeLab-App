/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIngredients
// ====================================================

export interface GetIngredients_recipes_nodes_ingredients {
  __typename: "Ingredient";
  id: string | null;
  name: string | null;
  imgUrl: string | null;
  amount: string | null;
}

export interface GetIngredients_recipes_nodes {
  __typename: "Recipe";
  name: string | null;
  ingredients: (GetIngredients_recipes_nodes_ingredients | null)[] | null;
}

export interface GetIngredients_recipes {
  __typename: "RecipesConnection";
  /**
   * A flattened list of the nodes.
   */
  nodes: (GetIngredients_recipes_nodes | null)[] | null;
}

export interface GetIngredients {
  recipes: GetIngredients_recipes | null;
}
