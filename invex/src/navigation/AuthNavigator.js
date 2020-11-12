import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";

const AuthNavigator = () => {
  return (
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
export default AuthNavigator;
