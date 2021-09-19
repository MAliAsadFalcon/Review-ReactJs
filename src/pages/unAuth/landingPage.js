import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";

const Content = styled.div`
  font-size: 46px;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  text-align: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url("/assets/BG.jpeg") center center / cover no-repeat fixed;
`;

const landingPage = () => {
  return (
    <Container>
      <Header />
      <Content data-aos="fade-up" data-aos-duration="1200">
        <p>YOU GOTTA NOURISH TO FLOURISH!</p>
      </Content>
    </Container>
  );
};

export default landingPage;
