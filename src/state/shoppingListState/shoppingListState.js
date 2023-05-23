import React, { createContext, useReducer } from "react";
import { cloneDeep } from "lodash";

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
    case "TOGGLE": {
      const newList = cloneDeep(state.ingredients);
      const ingredientIndex = action.payload;
      if (ingredientIndex >= 0 && ingredientIndex < newList.length) {
        newList[ingredientIndex].isComplete =
          !newList[ingredientIndex].isComplete;
      }
      return {
        ...state,
        ingredients: newList,
      };
    }
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
