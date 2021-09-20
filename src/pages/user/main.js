import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import styled from "styled-components";
import axios from "../../utils/axios";
import _ from "lodash";
import Header from "../../components/Header";

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
  const [restaurants, setrestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempRestaurants = await axios.get("/restaurant/");
    const tempReviews = await axios.get("/review/");
    setReviews(tempReviews.data.review);
    setrestaurants(tempRestaurants.data.restaurant);
  };

  return (
    <Container>
      <Header />

      <Content>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          }}
        >
          {restaurants.map((restaurant) => {
            let tempArray = [];
            let averageReview = 0;

            reviews.map((review) => {
              if (restaurant._id === review.restaurant) {
                tempArray.push(parseInt(review.star));
              }
              return null;
            });

            averageReview = _.sum(tempArray) / tempArray.length;
            return (
              <Cards
                name={restaurant.name}
                rating={averageReview}
                image={restaurant.image}
                description={restaurant.description}
                restaurantId={restaurant._id}
              />
            );
          })}
        </div>
      </Content>
    </Container>
  );
};

export default Main;
