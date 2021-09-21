import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Unauth from "../pages/unAuth/index";
import User from "../pages/user/index";
import Owner from "../pages/owner/index";
import Admin from "../pages/admin/index";
import UserContext from "../context/UserContext";
import Loader from "../components/Loader";

const Routes = ({ Loading }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Router>
        {Loading ? (
          <Loader />
        ) : user.role ? (
          user.role === "user" ? (
            <User />
          ) : user.role === "owner" ? (
            <Owner />
          ) : (
            <Admin />
          )
        ) : (
          <Unauth />
        )}
      </Router>
    </div>
  );
};

export default Routes;
