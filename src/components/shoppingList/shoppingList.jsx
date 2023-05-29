import "./shoppingList.css";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DeleteIcon from "@mui/icons-material/Delete";

export const ShoppingList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      payload: index,
    });
  };

  const handleDelete = (title) => {
    deleteMenuItem(title);
  };

  return (
    <div className="App">
      <Box width="100%">
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          sx={{
            width: isMobile ? "100%" : "200px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isMobile ? "100%" : "375px",
              boxSizing: "border-box",
              backgroundColor: "#6b6767",
            },
          }}
          // Add appropriate props for the mobile version
          // For example, onClose, onOpen, open, etc.
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
            padding: isMobile ? "10px" : "20px",
            minHeight: "100vh",
          }}
        >
          <Typography
            marginTop={isMobile ? "20px" : "120px"}
            marginLeft={isMobile ? "10px" : "350px"}
            sx={{ fontSize: "30px", fontFamily: "cursive" }}
          >
            SHOPPING LIST
          </Typography>
          <List sx={{ padding: isMobile ? "10px" : "25px" }}>
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <ListItem
                  key={index} // Use the index as the key
                  disablePadding
                  sx={{
                    marginLeft: isMobile ? "10px" : "650px",
                    marginBottom: isMobile ? "10px" : "20px",
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
