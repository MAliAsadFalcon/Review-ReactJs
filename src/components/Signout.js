import React from "react";
import styled from "styled-components";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  box-shadow: gray 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  cursor: pointer;
  margin-right: 2rem;
  margin-top: 6px;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Signout = () => {
  const history = useHistory();
  const signout = () => {
    axios.delete("/user/logout");
    window.location.reload();
  };
  return (
    <SignOut>
      <UserImg
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt=""
      />
      <DropDown>
        <span onClick={signout}> SignOut</span>
      </DropDown>
    </SignOut>
  );
};

export default Signout;
