import React from "react";
import LandingPage from "./landingPage";
import Signup from "./signup";
import Login from "./login";
import { Switch, Route, Redirect } from "react-router-dom";

const index = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default index;
