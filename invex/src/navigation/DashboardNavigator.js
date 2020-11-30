import React from "react";
import { Switch, Route } from "react-router-dom";
import FirebaseListener from "../components/FirebaseListener";
import Dashboard from "../pages/Dashboard";

const DashboardNavigator = () => {
  return (
    <FirebaseListener>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/" component={Dashboard} />{/* TODO: Replace for Page not found*/}
      </Switch>
    </FirebaseListener>
  );
};
export default DashboardNavigator;
