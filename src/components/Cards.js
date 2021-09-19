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
import { Link } from "react-router-dom";

const Cards = ({ name, rating, image, description, restaurantId }) => {
  return (
    <Card elevation="2" style={{ margin: 20, width: 345 }}>
      <CardHeader
        title={name}
        subheader={
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
        }
        style={{
          textAlign: "left",
          marginLeft: -8,
          backgroundColor: "#4B4B4B",
          color: "white",
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:5000/${image}`}
        alt="Paella dish"
      />
      <CardContent
        style={{
          textAlign: "left",
          marginLeft: -8,
          backgroundColor: "#4B4B4B",
          color: "white",
        }}
      >
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions
        style={{
          backgroundColor: "#4B4B4B",
          color: "white",
          borderTop: "2px solid black",
        }}
      >
        <Typography>
          <Link to={`/restaurantview/${restaurantId}`}>View restaurant</Link>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Cards;
