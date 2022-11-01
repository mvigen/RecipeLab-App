/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum DaysOfWeek {
  FRIDAY = "FRIDAY",
  MONDAY = "MONDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  THURSDAY = "THURSDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
}

export enum SectionsOfDay {
  BREAKFAST = "BREAKFAST",
  DINNER = "DINNER",
  LUNCH = "LUNCH",
  OTHER = "OTHER",
}

export interface AddAllIngredientsFromRecipeInput {
  recipeId?: string | null;
}

export interface AddDirectionsInput {
  direction: string;
}

export interface AddIngredientInput {
  name: string;
  price: number;
  sallingProdId: string;
  description: string;
  url: string;
  imgUrl: string;
  amount?: string | null;
}

export interface AddRecipeInput {
  name: string;
  description?: string | null;
  isPublic: boolean;
  timeToMake: number;
  servings: number;
  imgUrl?: string | null;
  ingredientsList: AddIngredientInput[];
  directionsList: AddDirectionsInput[];
}

export interface AddShoppingListInput {
  name?: string | null;
  isActive: boolean;
}

export interface AddShoppingListItemInput {
  name: string;
  price: number;
  imgUrl: string;
  sallingProdId: string;
  description: string;
  url: string;
  amount?: string | null;
}

export interface BooleanOperationFilterInput {
  eq?: boolean | null;
  neq?: boolean | null;
}

export interface ComparableNullableOfSingleOperationFilterInput {
  eq?: number | null;
  neq?: number | null;
  in?: (number | null)[] | null;
  nin?: (number | null)[] | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
}

export interface DaysOfWeekOperationFilterInput {
  eq?: DaysOfWeek | null;
  neq?: DaysOfWeek | null;
  in?: DaysOfWeek[] | null;
  nin?: DaysOfWeek[] | null;
}

export interface DeleteShoppingListInput {
  shoppingListId?: string | null;
}

export interface EditRecipeInput {
  id: string;
  name?: string | null;
  description?: string | null;
  isPublic?: boolean | null;
  timeToMake?: number | null;
  servings?: number | null;
  imgUrl?: string | null;
  ingredientsList?: AddIngredientInput[] | null;
  directionsList?: AddDirectionsInput[] | null;
}

export interface EditShoppingListInput {
  shoppingListId: string;
  name?: string | null;
  isActive?: boolean | null;
}

export interface EditShoppingListItemInput {
  id: string;
  name?: string | null;
  price?: number | null;
  imgUrl?: string | null;
  sallingProdId?: string | null;
  description?: string | null;
  url?: string | null;
  amount?: string | null;
}

export interface IngredientFilterInput {
  and?: IngredientFilterInput[] | null;
  or?: IngredientFilterInput[] | null;
  amount?: StringOperationFilterInput | null;
  isMarked?: BooleanOperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  price?: ComparableNullableOfSingleOperationFilterInput | null;
  sallingProdId?: StringOperationFilterInput | null;
  description?: StringOperationFilterInput | null;
  url?: StringOperationFilterInput | null;
  imgUrl?: StringOperationFilterInput | null;
  id?: StringOperationFilterInput | null;
}

export interface ListFilterInputTypeOfIngredientFilterInput {
  all?: IngredientFilterInput | null;
  none?: IngredientFilterInput | null;
  some?: IngredientFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfRecipeFilterInput {
  all?: RecipeFilterInput | null;
  none?: RecipeFilterInput | null;
  some?: RecipeFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfShoppingListFilterInput {
  all?: ShoppingListFilterInput | null;
  none?: ShoppingListFilterInput | null;
  some?: ShoppingListFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfTimeOfDayFilterInput {
  all?: TimeOfDayFilterInput | null;
  none?: TimeOfDayFilterInput | null;
  some?: TimeOfDayFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfWeekplanDayFilterInput {
  all?: WeekplanDayFilterInput | null;
  none?: WeekplanDayFilterInput | null;
  some?: WeekplanDayFilterInput | null;
  any?: boolean | null;
}

export interface ListFilterInputTypeOfWeekplanFilterInput {
  all?: WeekplanFilterInput | null;
  none?: WeekplanFilterInput | null;
  some?: WeekplanFilterInput | null;
  any?: boolean | null;
}

export interface RecipeFilterInput {
  and?: RecipeFilterInput[] | null;
  or?: RecipeFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  description?: StringOperationFilterInput | null;
  ingredients?: ListFilterInputTypeOfIngredientFilterInput | null;
  creator?: UserFilterInput | null;
  hideFromQuery?: BooleanOperationFilterInput | null;
}

export interface RemoveRecipeInput {
  recipeId?: string | null;
}

export interface RemoveShoppingListItemInput {
  ingredientIdList?: (string | null)[] | null;
}

export interface SectionsOfDayOperationFilterInput {
  eq?: SectionsOfDay | null;
  neq?: SectionsOfDay | null;
  in?: SectionsOfDay[] | null;
  nin?: SectionsOfDay[] | null;
}

export interface ShoppingListFilterInput {
  and?: ShoppingListFilterInput[] | null;
  or?: ShoppingListFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  ingredients?: ListFilterInputTypeOfIngredientFilterInput | null;
  isActive?: BooleanOperationFilterInput | null;
  creator?: UserFilterInput | null;
  creatorId?: StringOperationFilterInput | null;
  id?: StringOperationFilterInput | null;
}

export interface StringOperationFilterInput {
  and?: StringOperationFilterInput[] | null;
  or?: StringOperationFilterInput[] | null;
  eq?: string | null;
  neq?: string | null;
  contains?: string | null;
  ncontains?: string | null;
  in?: (string | null)[] | null;
  nin?: (string | null)[] | null;
  startsWith?: string | null;
  nstartsWith?: string | null;
  endsWith?: string | null;
  nendsWith?: string | null;
}

export interface TimeOfDayFilterInput {
  and?: TimeOfDayFilterInput[] | null;
  or?: TimeOfDayFilterInput[] | null;
  weekplanDay?: WeekplanDayFilterInput | null;
  weekplanDayId?: StringOperationFilterInput | null;
  name?: SectionsOfDayOperationFilterInput | null;
  recipes?: ListFilterInputTypeOfRecipeFilterInput | null;
  ingredients?: ListFilterInputTypeOfIngredientFilterInput | null;
  id?: StringOperationFilterInput | null;
}

export interface ToggleIsMarkedInput {
  ingredientId?: string | null;
}

export interface UpdateLikeCounterInput {
  recipeId?: string | null;
}

export interface UserFilterInput {
  and?: UserFilterInput[] | null;
  or?: UserFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  initials?: StringOperationFilterInput | null;
  email?: StringOperationFilterInput | null;
  googleId?: StringOperationFilterInput | null;
  recipes?: ListFilterInputTypeOfRecipeFilterInput | null;
  likedRecipes?: ListFilterInputTypeOfRecipeFilterInput | null;
  imgUrl?: StringOperationFilterInput | null;
  allShoppingLists?: ListFilterInputTypeOfShoppingListFilterInput | null;
  activeShoppingList?: ShoppingListFilterInput | null;
  activeShoppingListId?: StringOperationFilterInput | null;
  allWeekplans?: ListFilterInputTypeOfWeekplanFilterInput | null;
  activeWeekplan?: WeekplanFilterInput | null;
  activeWeekplanId?: StringOperationFilterInput | null;
  id?: StringOperationFilterInput | null;
}

export interface WeekplanDayFilterInput {
  and?: WeekplanDayFilterInput[] | null;
  or?: WeekplanDayFilterInput[] | null;
  weekplan?: WeekplanFilterInput | null;
  weekplanId?: StringOperationFilterInput | null;
  name?: DaysOfWeekOperationFilterInput | null;
  sections?: ListFilterInputTypeOfTimeOfDayFilterInput | null;
  id?: StringOperationFilterInput | null;
}

export interface WeekplanFilterInput {
  and?: WeekplanFilterInput[] | null;
  or?: WeekplanFilterInput[] | null;
  name?: StringOperationFilterInput | null;
  creator?: UserFilterInput | null;
  creatorId?: StringOperationFilterInput | null;
  days?: ListFilterInputTypeOfWeekplanDayFilterInput | null;
  isMealPlan?: BooleanOperationFilterInput | null;
  isActive?: BooleanOperationFilterInput | null;
  id?: StringOperationFilterInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
