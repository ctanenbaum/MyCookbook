import React from "react";
import "./home.css";
import Carousel from "react-material-ui-carousel";
import myImage1 from "../../projectImages/myCookbook.jpg";
import myImage2 from "../../projectImages/milkshakes.jpg";
import myImage3 from "../../projectImages/salad.jpg";
import myImage4 from "../../projectImages/pasta.jpg";
import { Paper, Grid } from "@mui/material";

export const PictureCarousel = React.memo(() => {
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
      alt: "Picture 4",
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Carousel showArrows infiniteLoop autoPlay interval={4000}>
          {items.map((item, i) => (
            <Paper key={i} sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={item.img}
                alt={item.alt}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Paper>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
});
