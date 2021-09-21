import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import UserContext from "../../context/UserContext";
import axios from "../../utils/axios";
import _ from "lodash";
import Cards from "../../components/Cards";
import { Link } from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton";

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tempRestaurants = await axios.get(
      `/restaurant/getByOwnerId/${user._id}`
    );
    const tempReviews = await axios.get("/review/");
    setrestaurants(tempRestaurants.data.restaurant);
    setReviews(tempReviews.data.review);
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
            })
          )}
        </div>
      </Content>
    </Container>
  );
};

export default Main;
