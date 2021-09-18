import React from "react";
import Cards from "../../components/Cards";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: url("/assets/BG3.jpg") center center / cover no-repeat fixed;
`;
const Content = styled.div`
  font-size: 46px;
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 35px;
  margin-bottom: 20px;
`;
const Main = () => {
  return (
    <Container>
      <Content>
        <u
          data-aos="fade-up"
          data-aos-duration="1200"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: 8,
          }}
        >
          GOODIES FOR THE FOODIES!
        </u>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="650"
        >
          <Cards />
          <Cards />
          <Cards />
        </div>
      </Content>
    </Container>
  );
};

export default Main;
