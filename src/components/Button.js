import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
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

const Button = ({ label }) => {
  return <ButtonContainer>{label}</ButtonContainer>;
};

export default Button;
