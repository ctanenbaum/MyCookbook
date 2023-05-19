import React, { createContext, useReducer } from "react";

const initialState = {
  menuItems: [],
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        menuItems: [...state.menuItems, action.menuItem],
      };
    default:
      return state;
  }
};

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, initialState);

  return (
    <MenuContext.Provider value={{ menuState, menuDispatch }}>
      {children}
    </MenuContext.Provider>
  );
};
