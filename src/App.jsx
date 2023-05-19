import "./App.css";
import { useReducer } from "react";
import { Home } from "./components/home/home";
import { Header } from "./components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ShoppingList } from "./components/shoppingList/shoppingList";
import { Recipe } from "./components/recipe/recipe";
import { MenuProvider } from "./state/menuState/menuState";
import { GlobalProvider } from "./state/searchState/GlobalState";
import { ShoppingListProvider } from "./state/shoppingListState/shoppingListState";

function App() {
  return (
    <HashRouter>
      <Header />
      <MenuProvider>
        <ShoppingListProvider>
          <GlobalProvider>
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
          </GlobalProvider>
        </ShoppingListProvider>
      </MenuProvider>
    </HashRouter>
  );
}

export default App;
