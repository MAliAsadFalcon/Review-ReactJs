import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #2a2a2a;
  display: grid;
  place-items: center;
`;

const Loader = () => {
  return (
    <Container>
      <CircularProgress size={50} />
    </Container>
  );
};

export default Loader;
