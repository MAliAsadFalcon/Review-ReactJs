import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header";
import RestaurantViewSkeleton from "../../components/RestaurantViewSkeleton";
import lottie from "lottie-web";

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

const Lottie = styled.img`
  margin-left: 2rem;
  height: 50vh;
  width: 40vw;
`;

const RestaurantView = () => {
  const { restaurantId } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const lottieContainer = useRef(null);

  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewReply, setReviewReply] = useState([]);
  const [averageReview, setAverageReview] = useState(0);
  const [reply, setReply] = useState("");
  const [reviewToReply, setReviewToReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    avgReview();
    // eslint-disable-next-line
  }, [reviews]);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../utils/empty.json"),
    });
    return () => {
      lottie.destroy();
    };
    // eslint-disable-next-line
  });

  const fetchData = async () => {
    const tempRestaurants = await axios.get(
      `/restaurant/getById/${restaurantId}`
    );
    setRestaurant(tempRestaurants.data.restaurant);
    const tempReviews = await axios.get("/review/");
    setReviews(tempReviews.data.review);
    const tempReviewReply = await axios.get(
      `/reviewreply/getByOwnerId/${user._id}`
    );
    setReviewReply(tempReviewReply.data.reviewReply);
    setLoading(false);
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

    const reviewReply = {
      reply: reply,
      review: reviewToReply,
      owner: user._id,
    };
    axios.post("/reviewreply/create", reviewReply).then(() => {
      axios.put(`/review/replied/${reviewToReply}`).then(() => {
        history.push("/");
      });
    });
  };

  return (
    <Container>
      <Header />

      {loading ? (
        <RestaurantViewSkeleton />
      ) : (
        <>
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
          <DecriptionText>
            {restaurant && restaurant.description}
          </DecriptionText>
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
            <div
              style={{
                height: 190,
                width: 190,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              className="lottieContainer"
              ref={lottieContainer}
            ></div>
            <Typography
              style={{
                textAlign: "center",
                marginLeft: -5,
              }}
            >
              Empty
            </Typography>
            {reviews.map((review) => {
              return (
                review.restaurant === restaurant._id && (
                  <div>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={review.user.username}
                        secondary={
                          <div>
                            <Rating
                              name="read-only"
                              value={review.star}
                              readOnly
                            />
                            <br />
                            <Typography
                              sx={{
                                display: "inline",
                                color: "white",
                                fontSize: 22,
                              }}
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
                    {!review.reply ? (
                      <form onSubmit={onSubmit}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: "2rem",
                          }}
                        >
                          <textarea
                            name="reply"
                            value={reply}
                            onChange={(e) => {
                              setReply(e.target.value);
                              setReviewToReply(review._id);
                            }}
                            placeholder="Write your reply"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              fontSize: 16,
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "90vw",
                              height: 60,
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              style={{
                                marginTop: 6,
                                maxWidth: 145,
                                right: "3.2rem",
                              }}
                              variant="contained"
                              type="submit"
                            >
                              Share Reply
                            </Button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      reviewReply.map((item) => {
                        return (
                          review._id === item.review && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                marginBottom: "2rem",
                              }}
                            >
                              <textarea
                                name="comments"
                                disabled
                                value={item.reply}
                                placeholder="Write your comment"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                                  fontSize: 16,
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  width: "90vw",
                                  height: 60,
                                }}
                              />
                            </div>
                          )
                        );
                      })
                    )}
                  </div>
                )
              );
            })}
          </List>
        </>
      )}
    </Container>
  );
};

export default RestaurantView;
