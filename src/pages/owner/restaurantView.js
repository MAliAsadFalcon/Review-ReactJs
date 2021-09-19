import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header";

import {
  Rating,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import _ from "lodash";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background-color: #2a2a2a;
`;

const RatingConatiner = styled.div`
  margin-top: -50px;
  margin-left: 2rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 48px;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: -0.7rem;
`;
const DecriptionText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 32px;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: 0px;
`;

const Picture = styled.img`
  margin-left: 2rem;
  height: 50vh;
  width: 40vw;
`;

const RestaurantView = () => {
  const { restaurantId } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [averageReview, setAverageReview] = useState(0);
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    avgReview();
    // eslint-disable-next-line
  }, [reviews]);

  const fetchData = async () => {
    const tempRestaurants = await axios.get(
      `/restaurant/getById/${restaurantId}`
    );
    setRestaurant(tempRestaurants.data.restaurant);
    const tempReviews = await axios.get("/review/");
    setReviews(tempReviews.data.review);
    setDisable(
      tempReviews.data.review.find((review) => review.user._id === user._id)
        ? true
        : false
    );
  };

  const avgReview = () => {
    let tempArray = [];
    let tempReview = 0;

    reviews.map((review) => {
      if (restaurant._id === review.restaurant) {
        tempArray.push(parseInt(review.star));
      }
      return null;
    });

    tempReview = _.sum(tempArray) / tempArray.length;
    setAverageReview(tempReview);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const review = {
      star: rating,
      comments: comments,
      restaurant: restaurantId,
      user: user._id,
    };
    axios.post("/review/create", review);
    history.push("/");
  };

  return (
    <Container>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Text>{restaurant && restaurant.name}</Text>
      </div>
      <RatingConatiner>
        <Rating
          name="read-only"
          value={averageReview}
          precision={0.5}
          readOnly
        />
      </RatingConatiner>
      <Picture src={`http://localhost:5000/${restaurant.image}`} />
      <DecriptionText>{restaurant && restaurant.description}</DecriptionText>
      <List
        sx={{
          width: "95%",
          bgcolor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2rem",
        }}
      >
        <Typography style={{ marginLeft: "1rem", marginBottom: 7 }}>
          Reviews
        </Typography>
        <Divider style={{ background: "grey" }} />
        {reviews.map((review) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={review.user.username}
                secondary={
                  <div>
                    <Rating name="read-only" value={review.star} readOnly />
                    <br />
                    <Typography
                      sx={{ display: "inline", color: "white", fontSize: 22 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.comments}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <Rating
            style={{ marginLeft: "3.2rem", marginBottom: 5, width: 20 }}
            name="simple-controlled"
            value={rating}
            disabled={disable}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <textarea
            name="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={disable}
            placeholder="Write your comment"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              fontSize: 16,
              marginLeft: "auto",
              marginRight: "auto",
              width: "90vw",
              height: 100,
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              disabled={disable}
              style={{
                marginTop: 6,
                maxWidth: 145,
                right: "3.2rem",
              }}
              variant="contained"
              type="submit"
            >
              Share Review
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default RestaurantView;
