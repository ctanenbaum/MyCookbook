//Chaya Tanenbaum
import "./home.css";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  CardActions,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const Home = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [menuType, setMenuType] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [dietType, setDietType] = useState("");

  const onInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    async function searchBar() {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=87e6d1f729b14eccb389ea297af15972&query=${input}&number=360`
      );
      const data = await response.json();
      setRecipes(data.results);
    }

    if (input !== "") {
      searchBar();
    }
  }, [input]);

  const menuOptions = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=87e6d1f729b14eccb389ea297af15972&type=${menuType}$number=360`
    )
      .then((response) => response.json())
      .then((data) => setMenuType(data.data))
      .catch((error) => console.error(error));
  };

  const cuisineOptions = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=87e6d1f729b14eccb389ea297af15972&cuisine=${cuisines}$number=360`
    )
      .then((response) => response.json())
      .then((data) => setCuisines(data.data))
      .catch((error) => console.error(error));
  };

  const dietOptions = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=87e6d1f729b14eccb389ea297af15972&diet=${dietType}$number=360`
    )
      .then((response) => response.json())
      .then((data) => setDietType(data.data))
      .catch((error) => console.error(error));
  };

  const pages = [{ name: "Recipes", path: "/recipe" }];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page) {
      navigate(page.path);
    }
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1} id="rateUs">
          <h3>Rate us:</h3>
          <Rating name="size-medium" defaultValue={4} />
        </Stack>
      </Box>
      <TextField
        placeholder="search recipes"
        variant="standard"
        onInput={onInput}
        value={input}
      />

      <Button>
        <SearchIcon />
      </Button>

      <Box padding={"50px"} display={"flex"} alignContent={"center"}>
        <Box marginLeft={"100px"}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="menuType" sx={{ fontSize: "28px" }}>
              Menu Type
            </InputLabel>
            <Select labelId="Menu Type" value={menuType} onChange={menuOptions}>
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
        <Box marginLeft={"275px"} marginRight={"275px"}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="Cuisines" sx={{ fontSize: "28px" }}>
              Cuisines
            </InputLabel>
            <Select
              labelId="Cuisines"
              value={cuisines}
              onChange={cuisineOptions}
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
        <Box>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="Diet" sx={{ fontSize: "28px" }}>
              Diet
            </InputLabel>
            <Select labelId="Diet" value={dietType} onChange={dietOptions}>
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
      </Box>

      <Box>
        <Grid container spacing={2}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ maxWidth: 345 }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                  </Button>
                ))}

                <CardContent>
                  <Typography variant="h5" component="h2">
                    {recipe.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {recipe.summary}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
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
