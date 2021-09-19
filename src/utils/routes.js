import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Unauth from "../pages/unAuth/index";
import User from "../pages/user/index";
import UserContext from "../context/UserContext";
const Routes = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Router>
        {user.role ? user.role === "user" && <User /> : <Unauth />}
      </Router>
    </div>
  );
};

export default Routes;
