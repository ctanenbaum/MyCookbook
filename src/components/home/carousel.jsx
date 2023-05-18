import React from "react";
import Carousel from "react-material-ui-carousel";
import myImage1 from "../../projectImages/myCookbook.jpg";
import myImage2 from "../../projectImages/milkshakes.jpg";
import myImage3 from "../../projectImages/salad.jpg";
import myImage4 from "../../projectImages/pasta.jpg";
import { Paper } from "@mui/material";
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
    <Carousel showArrows infiniteLoop autoPlay interval={4000}>
      {items.map((item, i) => (
        <Paper key={i}>
          <img src={item.img} alt={item.alt} />
        </Paper>
      ))}
    </Carousel>
  );
});
