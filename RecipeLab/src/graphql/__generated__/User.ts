/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_userInfo {
  __typename: "UserInfo";
  name: string | null;
  email: string | null;
  imgUrl: string | null;
  googleId: string | null;
}

export interface User {
  userInfo: User_userInfo | null;
}
