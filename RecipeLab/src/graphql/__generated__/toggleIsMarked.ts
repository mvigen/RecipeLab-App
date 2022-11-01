/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleIsMarkedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: toggleIsMarked
// ====================================================

export interface toggleIsMarked_toggleIsMarked_data {
  __typename: "User";
  id: string | null;
}

export interface toggleIsMarked_toggleIsMarked {
  __typename: "PayloadBaseOfUser";
  data: toggleIsMarked_toggleIsMarked_data | null;
}

export interface toggleIsMarked {
  toggleIsMarked: toggleIsMarked_toggleIsMarked | null;
}

export interface toggleIsMarkedVariables {
  input?: ToggleIsMarkedInput | null;
}
