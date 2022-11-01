export type RootStackParamList = {
  RecipeDetails: {
    id: string | undefined | null;
    name?: string | undefined | null;
  };
  Recipe: undefined;
  AddRecipe: undefined;
  EditRecipe: {
    id: string | undefined | null;
  };
  OwnRecipes: undefined;
  ShoppingList: undefined;
  FavorisedRecipes: undefined;
  AddShoppingList: undefined;
  EditShoppingList: {
    shoppingListId: string | undefined | null;
    name: string | undefined | null;
    isActive: boolean | undefined | null;
  };
};
