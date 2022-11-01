/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LikedRecipesQuery
// ====================================================

export interface LikedRecipesQuery_user_likedRecipes {
  __typename: "Recipe";
  id: string | null;
}

export interface LikedRecipesQuery_user {
  __typename: "User";
  likedRecipes: (LikedRecipesQuery_user_likedRecipes | null)[] | null;
}

export interface LikedRecipesQuery {
  user: LikedRecipesQuery_user | null;
}
