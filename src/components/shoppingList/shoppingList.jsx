import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MenuContext } from "../../state/menuState/menuState";
import { ShoppingListContext } from "../../state/shoppingListState/shoppingListState";
import paperImage from "../../projectImages/paper.png";

import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Checkbox,
  IconButton,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DeleteIcon from "@mui/icons-material/Delete";

export const ShoppingList = () => {
  const { recipeId } = useParams();
  const [setRecipes] = useState({});
  const APIKEY = "87e6d1f729b14eccb389ea297af15972";

  const { menuState, deleteMenuItem } = useContext(MenuContext);
  const { menuItems } = menuState;

  const { listState, listDispatch } = useContext(ShoppingListContext);
  const { ingredients } = listState;

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

  const toggleChecked = (index) => {
    listDispatch({
      type: "TOGGLE",
      payload: index, // Pass the index as the payload
    });
  };

  const handleDelete = (title) => {
    deleteMenuItem(title);
  };

  return (
    <div className="App">
      <Box>
        <Drawer
          variant="permanent"
          sx={{
            width: "200px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "375px",
              boxSizing: "border-box",
              backgroundColor: "#6b6767",
            },
          }}
        >
          <Toolbar />
          <Typography
            marginTop={"50px"}
            sx={{ color: "white", fontFamily: "cursive", fontSize: "30px" }}
          >
            MENU:{" "}
          </Typography>
          <Box sx={{ overflow: "hidden", backgroundColor: "#6b6767" }}>
            {menuItems.length === 0 ? (
              <Typography margin={"50px"} color={"white"}>
                No recipes added to the menu yet.
              </Typography>
            ) : (
              <List>
                {menuItems.map((menuItem) => (
                  <ListItem
                    key={menuItem.title}
                    disablePadding
                    sx={{
                      margin: "5px",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <RestaurantMenuIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontFamily: "fantacy",
                          color: "Menu",
                          backgroundColor: "#6b6767",
                        }}
                        primary={menuItem.title}
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(menuItem.title)}
                      >
                        <DeleteIcon sx={{ color: "white" }} />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Drawer>
        <Box
          sx={{
            overflow: "hidden",
            backgroundImage: `url(${paperImage})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            padding: "20px",
            minHeight: "100vh",
          }}
        >
          <Typography
            marginTop={"120px"}
            marginLeft={"350px"}
            sx={{ fontSize: "30px", fontFamily: "cursive" }}
          >
            SHOPPING LIST
          </Typography>
          <List sx={{ padding: "25px" }}>
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <ListItem
                  key={index} // Use the index as the key
                  disablePadding
                  sx={{
                    marginLeft: "650px",
                    marginBottom: "20px",
                    fontFamily: "cursive",
                    fontSize: "20px",
                  }}
                >
                  <Checkbox
                    checked={ingredient.isComplete}
                    onChange={() => toggleChecked(index)} // Pass the index to toggleChecked
                    sx={{ marginRight: "10px" }}
                  />
                  {ingredient.original}
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </div>
  );
};
