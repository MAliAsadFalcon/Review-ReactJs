import React from "react";
import UserMain from "./user/main";
import RestaurantMain from "./restaurant/main";
import ReviewMain from "./review/main";
import ReplyMain from "./reply/main";
import { Switch, Route, Redirect } from "react-router-dom";

const index = () => {
  return (
    <Switch>
      <Route path="/" exact component={UserMain} />
      <Route path="/user" exact component={UserMain} />
      <Route path="/restaurant" exact component={RestaurantMain} />
      <Route path="/review" exact component={ReviewMain} />
      <Route path="/reply" exact component={ReplyMain} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default index;
