import React from "react";
import Main from "./main";
import { Switch, Route, Redirect } from "react-router-dom";

const index = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default index;
