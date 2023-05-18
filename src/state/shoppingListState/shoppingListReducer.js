export const ListActions = {
  ADD: "ADD",
};

export const shoppingListReducer = (state, action) => {
  switch (action.type) {
    case ListActions.ADD: {
      return {
        ...state,
        ingredients: action.recipe || [],
      };
    }
    default:
      return state;
  }
};
