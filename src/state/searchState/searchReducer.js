export const HomeActions = {
  SEARCH: "SEARCH",
};

export const SearchReducer = (state, action) => {
  switch (action.type) {
    case HomeActions.SEARCH: {
      const { title, image } = action.recipe;
      const newRecipe = { title, image };
      return { recipes: [...state.recipes, newRecipe] };
    }
    default: {
      return state;
    }
  }
};
