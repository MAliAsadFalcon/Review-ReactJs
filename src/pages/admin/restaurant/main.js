import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Restaurant from "./restaurant";

const Container = styled.div`
  position: absolute;
  height: 100%;
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
        <Restaurant />
      </Container>
    </Sidebar>
  );
};

export default Main;
