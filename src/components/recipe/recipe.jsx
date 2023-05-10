import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export const Recipe = () => {
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState({});
  const APIKEY = "87e6d1f729b14eccb389ea297af15972";

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${APIKEY}`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.data[0]))
      .catch(() => {
        console.log("error");
      });
  }, [recipeId]);

  return (
    <div className="App">
      <Box>
        <Typography> {recipeId} </Typography>
      </Box>
      <article>
        <h1>{recipes.title}</h1>
        <img src={recipes.image} alt="recipe" />
        <ul className="instructions">
          {recipes.extendedIngredients &&
            recipes.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          <li>Preparation time: {recipes.readyInMinutes} minutes</li>
          <li>Number of servings: {recipes.servings}</li>
        </ul>

        <a href={recipes.sourceUrl}>Go to Recipe</a>
      </article>
    </div>
  );
};
