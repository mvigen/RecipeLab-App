/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LikedRecipesScreenQuery
// ====================================================

export interface LikedRecipesScreenQuery_user_likedRecipes {
  __typename: "Recipe";
  name: string | null;
  id: string | null;
  imgUrl: string | null;
  likeCounter: number;
}

export interface LikedRecipesScreenQuery_user {
  __typename: "User";
  likedRecipes: (LikedRecipesScreenQuery_user_likedRecipes | null)[] | null;
}

export interface LikedRecipesScreenQuery {
  user: LikedRecipesScreenQuery_user | null;
}
