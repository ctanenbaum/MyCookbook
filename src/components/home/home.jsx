//Chaya Tanenbaum
import "./home.css";
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { HomeActions } from "../../state/searchState/searchReducer";
import { SearchContext } from "../../state/searchState/searchContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import Carousel from "react-material-ui-carousel";
import myImage1 from "../../projectImages/myCookbook.jpg";
import myImage2 from "../../projectImages/milkshakes.jpg";
import myImage3 from "../../projectImages/salad.jpg";
import myImage4 from "../../projectImages/pasta.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  CardActions,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const APIKEY = "87e6d1f729b14eccb389ea297af15972";
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [menuType, setMenuType] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [dietType, setDietType] = useState("");
  const { searchState, searchDispatch } = useContext(SearchContext);

  function PictureCarousel() {
    const items = [
      {
        img: myImage1,
        alt: "Picture 1",
      },
      {
        img: myImage2,
        alt: "Picture 2",
      },
      {
        img: myImage3,
        alt: "Picture 3",
      },
      {
        img: myImage4,
        alt: "Picture 3",
      },
    ];

    return (
      <Carousel>
        {items.map((item, i) => (
          <Paper key={i}>
            <img src={item.img} alt={item.alt} />
          </Paper>
        ))}
      </Carousel>
    );
  }

  const searchRecipe = () => {
    searchDispatch({
      type: HomeActions.SEARCH,
      recipe: { title: input },
    });
    searchBar();
  };
  const searchBar = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${input}&number=360&type=${menuType}&cuisine=${cuisines}&diet=${dietType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
      });
  };

  const updateMenuType = (event) => {
    console.log(event.target.value);
    setMenuType(event.target.value);
  };
  // and maybe call api with new type

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
      <Box sx={{ flexGrow: 1 }}>
        <PictureCarousel />
      </Box>

      <Box padding={"50px"} display={"flex"} alignContent={"center"}>
        <Box marginLeft={"50px"}>
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
        <Box marginLeft={"125px"} marginRight={"125px"}>
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
        <Box marginRight={"150px"}>
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
        />{" "}
        <Button onClick={() => searchBar()}>
          <SearchIcon />
        </Button>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipes.id}>
              <Card
                sx={{ maxWidth: 345, marginLeft: "70px", marginTop: "50px" }}
              >
                <Button onClick={() => setURL(recipe.id)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                </Button>

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
