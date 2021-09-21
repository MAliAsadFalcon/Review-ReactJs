import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Review from "./review";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: #2a2a2a;
  margin-left: 210px;
  width: calc(100% - 210px);
`;

const Main = () => {
  return (
    <Sidebar>
      <Container>
        <Header />
        <Review />
      </Container>
    </Sidebar>
  );
};

export default Main;
