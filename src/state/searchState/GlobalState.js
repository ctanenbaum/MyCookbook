import React, { createContext, useReducer } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = {
    recipes: [],
  };

  const globalReducer = (state, action) => {
    switch (action.type) {
      case "SET_RECIPES": {
        return {
          ...state,
          recipes: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
