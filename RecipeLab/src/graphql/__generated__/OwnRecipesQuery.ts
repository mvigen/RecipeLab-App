/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OwnRecipesQuery
// ====================================================

export interface OwnRecipesQuery_user_recipes {
  __typename: "Recipe";
  name: string | null;
  id: string | null;
  imgUrl: string | null;
  likeCounter: number;
}

export interface OwnRecipesQuery_user {
  __typename: "User";
  recipes: (OwnRecipesQuery_user_recipes | null)[] | null;
}

export interface OwnRecipesQuery {
  user: OwnRecipesQuery_user | null;
}
