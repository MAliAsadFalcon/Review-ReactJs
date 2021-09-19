import React from "react";
import Main from "./main";
import Create from "./createRestaurant";
import RestaurantView from "./restaurantView";

import { Switch, Route, Redirect } from "react-router-dom";

const index = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/create" exact component={Create} />
      <Route
        path="/restaurantview/:restaurantId"
        exact
        component={RestaurantView}
      />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default index;
