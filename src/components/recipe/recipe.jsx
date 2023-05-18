import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ListActions } from "../../state/shoppingListState/shoppingListReducer";
import { shoppingListContext } from "../../state/shoppingListState/shoppingListContext";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const Recipe = () => {
  const { listDispatch } = useContext(shoppingListContext);
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState({});
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
  function addIngredients(recipeId) {
    navigate(`/shoppingList/${recipeId}`);
  }

  return (
    <div className="App">
      <Box maxWidth={"900px"} marginLeft={"325px"} marginTop={"80px"}>
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
          <Typography sx={{ fontWeight: "bold" }}>
            Preparation time: {recipes.readyInMinutes} minutes
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
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
          <IconButton
            sx={{
              fontSize: "15px",
              color: "#6b6767",
              backgroundColor: "#5af1f7",
              padding: "20px",
            }}
            aria-label="add to shopping cart"
            onClick={() => addIngredients(recipes.id)}
          >
            <AddShoppingCartIcon />
            ADD INGREDIENTS TO SHOPPING LIST
            <AddShoppingCartIcon />
          </IconButton>

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
