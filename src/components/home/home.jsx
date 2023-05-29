//Chaya Tanenbaum
import "./home.css";
import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../state/searchState/GlobalState";
import { MenuContext } from "../../state/menuState/menuState";
import { PictureCarousel } from "./carousel";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { state: globalState, dispatch: globalDispatch } =
    useContext(GlobalContext);

  const { menuDispatch, menuState } = useContext(MenuContext);

  const APIKEY = "87e6d1f729b14eccb389ea297af15972";
  const [input, setInput] = useState("");
  const [setRecipes] = useState([]);
  const [menuType, setMenuType] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [dietType, setDietType] = useState("");
  const [disabledButtons, setDisabledButtons] = useState([]);

  const searchBar = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${input}&number=360&type=${menuType}&cuisine=${cuisines}&diet=${dietType}`
    )
      .then((response) => response.json())
      .then((data) => {
        globalDispatch({ type: "SET_RECIPES", payload: data.results });
        setRecipes(data.results);
      });
  };

  const addToMenu = (title, recipeId) => {
    const menuItem = {
      title: title,
    };
    menuDispatch({
      type: "ADD",
      menuItem: menuItem,
    });
    menuDispatch({
      type: "DISABLE",
      title: recipeId,
    });
    console.log(menuItem);
  };

  const isButtonDisabled = (recipeId) => {
    return menuState.disabledRecipes.includes(recipeId);
  };

  const updateMenuType = (event) => {
    console.log(event.target.value);
    setMenuType(event.target.value);
  };

  const updateCuisines = (event) => {
    console.log(event.target.value);
    setCuisines(event.target.value);
  };

  const updateDietType = (event) => {
    console.log(event.target.value);
    setDietType(event.target.value);
  };

  const navigate = useNavigate();

  function setURL(recipeId) {
    navigate(`/recipe/${recipeId}`);
  }

  return (
    <div className="App">
      <Toolbar />
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          top: 0,
          left: 0,
          zIndex: "0",
          width: "100%",
        }}
      >
        <PictureCarousel />
      </Box>

      <Box
        padding={isMobile ? "10px" : "50px"}
        display="flex"
        alignItems="center"
      >
        <Box marginLeft={isMobile ? "10px" : "50px"}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="menuType" sx={{ fontSize: "28px" }}>
              Menu Type
            </InputLabel>
            <Select
              labelId="Menu Type"
              value={menuType}
              onChange={updateMenuType}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="main course">Main Course</MenuItem>
              <MenuItem value="side dish">Side Dish</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
              <MenuItem value="appetizer">Appetizer</MenuItem>
              <MenuItem value="salad">Salad</MenuItem>
              <MenuItem value="bread">Bread</MenuItem>
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="beverage">Beverage</MenuItem>
              <MenuItem value="sauce">Sauce</MenuItem>
              <MenuItem value="marinade">Marinade</MenuItem>
              <MenuItem value="fingerfood">Fingerfood</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
              <MenuItem value="drink">Drink</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          marginLeft={isMobile ? "10px" : "125px"}
          marginRight={isMobile ? "10px" : "125px"}
        >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="Cuisines" sx={{ fontSize: "28px" }}>
              Cuisines
            </InputLabel>
            <Select
              labelId="Cuisines"
              value={cuisines}
              onChange={updateCuisines}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="african">African</MenuItem>
              <MenuItem value="american">American</MenuItem>
              <MenuItem value="british">British</MenuItem>
              <MenuItem value="cajun">Cajun</MenuItem>
              <MenuItem value="caribbean">Caribbean</MenuItem>
              <MenuItem value="chinese">Chinese</MenuItem>
              <MenuItem value="eastern european">Eastern European</MenuItem>
              <MenuItem value="european">European</MenuItem>
              <MenuItem value="french">French</MenuItem>
              <MenuItem value="german">German</MenuItem>
              <MenuItem value="greek">Greek</MenuItem>
              <MenuItem value="indian">Indian</MenuItem>
              <MenuItem value="irish">Irish</MenuItem>
              <MenuItem value="italian">Italian</MenuItem>
              <MenuItem value="japanese">Japanese</MenuItem>
              <MenuItem value="jewish">Jewish</MenuItem>
              <MenuItem value="korean">Korean</MenuItem>
              <MenuItem value="latin american">Latin American</MenuItem>
              <MenuItem value="mediterranean">Mediterranean</MenuItem>
              <MenuItem value="mexican">Mexican</MenuItem>
              <MenuItem value="middle eastern">Middle Eastern</MenuItem>
              <MenuItem value="nordic">Nordic</MenuItem>
              <MenuItem value="southern">Southern</MenuItem>
              <MenuItem value="spanish">Spanish</MenuItem>
              <MenuItem value="thai">Thai</MenuItem>
              <MenuItem value="vietnamese">Vietnamese</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box marginRight={isMobile ? "10px" : "150px"}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="Diet" sx={{ fontSize: "28px" }}>
              Diet
            </InputLabel>
            <Select labelId="Diet" value={dietType} onChange={updateDietType}>
              <MenuItem value=""></MenuItem>
              <MenuItem value="gluten free">Gluten Free</MenuItem>
              <MenuItem value="ketogenic">Ketogenic</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="pescatarian">Pescatarian</MenuItem>
              <MenuItem value="paleo">Paleo</MenuItem>
              <MenuItem value="primal">Primal</MenuItem>
              <MenuItem value="whole30">Whole30</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          placeholder="search recipes"
          variant="standard"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button onClick={() => searchBar()}>
          <SearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {globalState.recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  marginLeft: isMobile ? "10px" : "70px",
                  marginTop: isMobile ? "10px" : "50px",
                  boxShadow: "0px 2px 45px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Button onClick={() => setURL(recipe.id)}>
                  <CardMedia
                    component="img"
                    height="240"
                    width="100%"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                </Button>

                <CardContent>
                  <Typography variant="h5" component="h2">
                    {recipe.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToMenu(recipe.title, recipe.id)}
                    disabled={isButtonDisabled(recipe.id)}
                  >
                    <AddIcon />
                    Add to Menu
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
