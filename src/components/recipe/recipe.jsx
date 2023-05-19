import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ShoppingListContext } from "../../state/shoppingListState/shoppingListState";
import { MenuContext } from "../../state/menuState/menuState";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import marbleBackground from "../../projectImages/marbleBackground.jpg";
export const Recipe = () => {
  const { listDispatch } = useContext(ShoppingListContext);
  const { menuDispatch } = useContext(MenuContext);
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState({});
  const [disabledButtons, setDisabledButtons] = useState([]);
  const APIKEY = "87e6d1f729b14eccb389ea297af15972";

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${APIKEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [recipeId]);

  const navigate = useNavigate();
  const handleAddToShoppingList = () => {
    listDispatch({
      type: "ADD_INGREDIENT",
      payload: recipes.extendedIngredients,
    });
    navigate(`/shoppingList/${recipeId}`);
  };

  const addToMenu = (title, recipeId) => {
    const menuItem = {
      title: title,
    };
    menuDispatch({
      type: "ADD",
      menuItem: menuItem,
    });
    setDisabledButtons([...disabledButtons, recipeId]);
    console.log(recipeId);
    console.log(menuItem);
  };

  const isButtonDisabled = (buttonId) => {
    return disabledButtons.includes(buttonId);
  };

  return (
    <div className="App">
      <Box
        maxWidth={"900px"}
        marginLeft={"325px"}
        marginTop={"80px"}
        sx={{ backgroundImage: `url(${marbleBackground})` }}
      >
        <article>
          <Typography
            marginTop={"150px"}
            marginBottom={"50px"}
            sx={{
              color: "mediumpurple",
              fontFamily: "cursive",
              fontSize: "2rem",
            }}
          >
            {recipes.title}
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontFamily: "cursive" }}>
            Preparation time: {recipes.readyInMinutes} minutes
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontFamily: "cursive" }}>
            Number of servings: {recipes.servings}
          </Typography>
          <img
            src={recipes.image}
            alt="recipe"
            style={{ border: "5px dashed mediumPurple", marginTop: "15px" }}
          />
          <Typography
            sx={{
              marginTop: "20px",
              fontFamily: "cursive",
              fontSize: "30px",
              fontWeight: "bold",
              color: "mediumpurple",
            }}
          >
            Ingredients:
          </Typography>
          <List sx={{ alignContent: "center", padding: "25px" }}>
            {recipes.extendedIngredients &&
              recipes.extendedIngredients.map((ingredient) => (
                <ListItem
                  key={ingredient.id}
                  disablePadding
                  sx={{
                    marginLeft: "150px",
                    marginBottom: "20px",
                    fontFamily: "cursive",
                    fontSize: "20px",
                  }}
                >
                  {ingredient.original}
                </ListItem>
              ))}
          </List>
          <Button
            sx={{
              fontSize: "15px",
              color: "#6b6767",
              backgroundColor: "#5af1f7",
              padding: "10px",
              marginLeft: "50px",
              marginRight: "50px",
            }}
            onClick={() => addToMenu(recipes.title, recipes.id)}
            disabled={isButtonDisabled(recipes.id)}
          >
            <AddIcon />
            Add to Menu
          </Button>
          <Button
            sx={{
              fontSize: "15px",
              color: "#6b6767",
              backgroundColor: "#5af1f7",
              padding: "10px",
            }}
            aria-label="add to shopping cart"
            onClick={handleAddToShoppingList}
          >
            <AddShoppingCartIcon />
            ADD INGREDIENTS TO SHOPPING LIST
          </Button>

          <Typography
            sx={{
              marginBottom: "20px",
              marginTop: "20px",
              fontFamily: "cursive",
              fontSize: "30px",
              fontWeight: "bold",
              color: "mediumpurple",
            }}
          >
            Instructions:
          </Typography>
          <Typography
            sx={{
              marginBottom: "20px",
              fontFamily: "cursive",
              fontSize: "20px",
            }}
          >
            {recipes.instructions}
          </Typography>
        </article>
      </Box>
    </div>
  );
};
