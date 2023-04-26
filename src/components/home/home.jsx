//Chaya Tanenbaum
import "../../App.css";
import "./home.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions, InputLabel } from "@mui/material";
import myImage1 from "../../projectImages/bahamas.jpg";
import myImage2 from "../../projectImages/niagara.jpg";
import myImage3 from "../../projectImages/venice.jpg";
import myImage4 from "../../projectImages/IMG_1451.JPG";
import myImage5 from "../../projectImages/arizona.jpg";
import myImage6 from "../../projectImages/china.jpg";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const Home = () => {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1} id="rateUs">
          <h3>Rate us:</h3>
          <Rating name="size-medium" defaultValue={4} />
        </Stack>
      </Box>
      <TextField placeholder="search recipes" variant="standard" />

      <SearchIcon />

      <Box padding={"50px"}>
        <InputLabel id="menuType">Menu Type</InputLabel>
        <Select labelId="Menu Type"></Select>
        <InputLabel id="Cuisines">Cuisines</InputLabel>
        <Select labelId="Cuisines"></Select>
        <InputLabel id="Diet">Diet</InputLabel>
        <Select labelId="Diet"></Select>
      </Box>

      <box id="row1">
        <Card sx={{ maxWidth: 345 }} id="bahamas">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage1}
              alt="Bahamas"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Bahamas
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }} id="niagara">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage2}
              alt="Niagara Falls"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Niagara Falls
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }} id="venice">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage3}
              alt="Venice"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Venice
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>
      </box>
      <box id="row2">
        <Card sx={{ maxWidth: 345 }} id="netanya">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage4}
              alt="Netanya"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Netanya
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>
        <br></br>

        <Card sx={{ maxWidth: 345 }} id="arizona">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage5}
              alt="Arizona"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Arizona
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>
        <br></br>

        <Card sx={{ maxWidth: 345 }} id="china">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={myImage6}
              alt="China"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                China
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Details
            </Button>
          </CardActions>
        </Card>
      </box>
      <br></br>
      <Button
        variant="contained"
        color="secondary"
        target="_blank"
        component="a"
        href="https://travel.usnews.com/rankings/worlds-best-vacations/"
      >
        CLICK HERE FOR MORE LOCATIONS
      </Button>
      <br></br>
      <br></br>
      <h2 textAlign="center"> To join our email list</h2>
      <FormGroup id="subscribe">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Subscribe"
        />
      </FormGroup>
    </div>
  );
};