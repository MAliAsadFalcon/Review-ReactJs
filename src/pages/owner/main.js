import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import UserContext from "../../context/UserContext";
import axios from "../../utils/axios";
import _ from "lodash";
import Cards from "../../components/Cards";
import { Link } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton";
import lottie from "lottie-web";
import { Typography } from "@mui/material";
const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background-color: #2a2a2a;
`;
const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 20px;
`;

const Main = () => {
  const { user } = useContext(UserContext);

  const [restaurants, setrestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const lottieContainer = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

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
    let tempRestaurants = [];

    const resultRestaurants = await axios.get(
      `/restaurant/getByOwnerId/${user._id}`
    );
    const resultReviews = await axios.get("/review/");
    resultRestaurants.data.restaurant.map((restaurant) => {
      let tempArray = [];
      let averageReview = 0;

      resultReviews.data.review.map((review) => {
        if (restaurant._id === review.restaurant) {
          tempArray.push(parseInt(review.star));
        }
        return null;
      });

      averageReview = _.sum(tempArray) / tempArray.length;
      restaurant.averageReview = averageReview ? averageReview : 0;
      tempRestaurants.push(restaurant);
    });
    tempRestaurants.sort((a, b) =>
      a.averageReview < b.averageReview ? 1 : -1
    );

    setrestaurants(tempRestaurants);
    setLoading(false);
  };

  return (
    <Container>
      <Header />
      <Content>
        <div style={{ marginLeft: "1.2rem" }}>
          <Link to="/create">
            <Button label="ADD NEW" />
          </Link>
        </div>
        {restaurants.length === 0 && !loading && (
          <>
            <div
              style={{
                height: 190,
                width: 190,
                margin: "auto",
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
          </>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          }}
        >
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            restaurants.map((restaurant) => {
              return (
                <Cards
                  name={restaurant.name}
                  rating={restaurant.averageReview}
                  image={restaurant.image}
                  description={restaurant.description}
                  restaurantId={restaurant._id}
                />
              );
            })
          )}
        </div>
      </Content>
    </Container>
  );
};

export default Main;
