import React, { createContext, useReducer } from "react";

const initialState = {
  menuItems: [],
  disabledRecipes: [],
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const isRecipeExists = state.menuItems.some(
        (menuItem) => menuItem.title === action.menuItem.title
      );

      if (isRecipeExists) {
        return state;
      }

      return {
        ...state,
        menuItems: [...state.menuItems, action.menuItem],
      };
    case "DELETE":
      return {
        ...state,
        menuItems: state.menuItems.filter(
          (menuItem) => menuItem.title !== action.title
        ),
      };
    case "DISABLE":
      return {
        ...state,
        disabledRecipes: [...state.disabledRecipes, action.title],
      };
    default:
      return state;
  }
};

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, initialState);

  const addMenuItem = (menuItem) => {
    menuDispatch({ type: "ADD", menuItem });
  };

  const deleteMenuItem = (title) => {
    menuDispatch({ type: "DELETE", title });
  };

  const disableRecipe = (title) => {
    menuDispatch({ type: "DISABLE", title });
  };

  return (
    <MenuContext.Provider
      value={{
        menuState,
        menuDispatch,
        addMenuItem,
        deleteMenuItem,
        disableRecipe,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
