import "./App.css";
import { useReducer } from "react";
import { Home } from "./components/home/home";
import { Todo } from "./components/todo/todo";
import { Header } from "./components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TodoContext } from "./state/todoState/todoContext";
import { todoReducer } from "./state/todoState/todoReducer";
import { ShoppingList } from "./components/shoppingList/shoppingList";
import { Recipe } from "./components/recipe/recipe";
import { SearchContext } from "./state/searchState/searchContext";
import { SearchReducer } from "./state/searchState/searchReducer";

function App() {
  const [searchState, searchDispatch] = useReducer(SearchReducer, {
    recipes: [],
  });
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
  });

  return (
    <HashRouter>
      <Header />
      <SearchContext.Provider value={{ searchState, searchDispatch }}>
        <TodoContext.Provider value={{ todoState, todoDispatch }}>
          <Routes>
            {/* http://localhost:3000/#/ */}
            <Route path="/" element={<Home />} />
            {/* http://localhost:3000/#/todo */}
            <Route path="/todo" element={<Todo />} />
            {/* http://localhost:3000/#/shoppingList */}
            <Route path="/shoppingList" element={<ShoppingList />} />
            {/* http://localhost:3000/#/recipe/{id} */}
            <Route path="/recipe/:recipeId" element={<Recipe />} />
          </Routes>
        </TodoContext.Provider>
      </SearchContext.Provider>
    </HashRouter>
  );
}

export default App;
