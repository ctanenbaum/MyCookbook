import "./App.css";
import { useReducer } from "react";
import { Home } from "./components/home/home";
import { Todo } from "./components/todo/todo";
import { Header } from "./components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ShoppingList } from "./components/shoppingList/shoppingList";
import { Recipe } from "./components/recipe/recipe";
import { menuContext } from "./state/menuState/menuContext";
import { menuReducer } from "./state/menuState/menuReducer";
import { shoppingListContext } from "./state/shoppingListState/shoppingListContext";
import { shoppingListReducer } from "./state/shoppingListState/shoppingListReducer";
import { GlobalProvider } from "./state/searchState/GlobalState";

function App() {
  const [listState, listDispatch] = useReducer(shoppingListReducer, {
    listItems: [],
  });
  const [menuState, menuDispatch] = useReducer(menuReducer, {
    menuItems: [],
  });

  return (
    <HashRouter>
      <Header />
      <GlobalProvider>
        <shoppingListContext.Provider value={{ listState, listDispatch }}>
          <menuContext.Provider value={{ menuState, menuDispatch }}>
            <Routes>
              {/* http://localhost:3000/#/ */}
              <Route path="/" element={<Home />} />

              {/* http://localhost:3000/#/shoppingList/{id} */}
              <Route
                path="/shoppingList/:recipeId"
                element={<ShoppingList />}
              />
              {/* http://localhost:3000/#/shoppingList */}
              <Route path="/shoppingList" element={<ShoppingList />} />
              {/* http://localhost:3000/#/recipe/{id} */}
              <Route path="/recipe/:recipeId" element={<Recipe />} />
            </Routes>
          </menuContext.Provider>
        </shoppingListContext.Provider>
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
