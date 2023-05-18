export const MenuActions = {
  ADD: "ADD",
};

export const menuReducer = (state, action) => {
  switch (action.type) {
    case MenuActions.ADD: {
      return {
        ...state,
        menuItems: [...state.menuItems, action.menuItem],
      };
    }
    default:
      return state;
  }
};
