import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Signout from "./Signout";
import Button from "./Button";

const Container = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 30px;
  z-index: 3;
  border-bottom: 3px solid rgba(0, 0, 0, 0.6);
`;

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {user.role ? (
        user.role === "user" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <p
              style={{
                marginLeft: 3,
                marginTop: "-.2rem",
                fontSize: 46,
                fontWeight: "bolder",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                GOODIES FOR THE FOODIES!
              </Link>
            </p>

            <Signout />
          </div>
        ) : (
          (user.role = "owner" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <p
                style={{
                  marginLeft: 3,
                  marginTop: "-.2rem",
                  fontSize: 46,
                  fontWeight: "bolder",
                }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  YOUR RESTAURANT LIST!
                </Link>
              </p>

              <Signout />
            </div>
          ))
        )
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 12,
          }}
        >
          <Link to="/login">
            <Button label="Login" />
          </Link>
          <Link to="/signup">
            <Button label="Signup" />
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Header;
