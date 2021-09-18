import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 30px;
  letter-spacing: 16px;
  z-index: 3;
  border-bottom: 3px solid rgba(0, 0, 0, 0.6);
`;
const Content = styled.div`
  font-size: 46px;
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.8);
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

const Button = styled.button`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
  margin-right: 20px;
  &:hover {
    background-color: rgba(208, 211, 212, 0.2);
    border: 1px solid white;
    color: white;
  }
`;

const Signup = styled.nav``;

const landingPage = () => {
  return (
    <Container>
      <Header>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/signup">
          <Button>Signup</Button>
        </Link>
      </Header>
      <Content data-aos="fade-up" data-aos-duration="1200">
        <p
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: 8,
          }}
        >
          YOU GOTTA NOURISH TO FLOURISH!
        </p>
      </Content>
    </Container>
  );
};

export default landingPage;
