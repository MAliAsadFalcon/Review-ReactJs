import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  CardActions,
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";

const Cards = () => {
  return (
    <Card elevation="2" style={{ margin: 20, width: 345 }}>
      <CardHeader
        title="cafe perks"
        subheader={<Rating name="read-only" value="3" readOnly />}
        style={{
          textAlign: "left",
          marginLeft: -8,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        alt="Paella dish"
      />
      <CardContent
        style={{
          textAlign: "left",
          marginLeft: -8,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      >
        <Typography>best restaurant</Typography>
      </CardContent>
      <CardActions
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          borderTop: "2px solid black",
        }}
      >
        <Typography size="small">Rate this restaurant?</Typography>
        <StarsIcon />
      </CardActions>
    </Card>
  );
};

export default Cards;
