import React from 'react';
import { Switch, Route } from "react-router-dom";
import Products from "../pages/Products";
import Product from "../pages/Product";
import LowStock from "../pages/LowStock";
import Logs from "../pages/ActionLogs";
import Landing from "../pages/Dashboard/Landing";

const DashboardContentNavigator = () =>{
  return (
    <Switch>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/products/:id" component={Product}/>
        <Route exact path="/lowstock" component={LowStock}/>
        <Route exact path="/logs" component={Logs}/>
        <Route exact path="/dashboard" component={Landing}/>
        <Route path="/" component={Landing}/>
    </Switch>
  );
}
export default DashboardContentNavigator;