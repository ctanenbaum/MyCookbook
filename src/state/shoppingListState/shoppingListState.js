import React, { createContext, useReducer } from "react";

const initialState = {
  ingredients: [],
};

const shoppingListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    default:
      return state;
  }
};

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [listState, listDispatch] = useReducer(
    shoppingListReducer,
    initialState
  );

  return (
    <ShoppingListContext.Provider value={{ listState, listDispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
