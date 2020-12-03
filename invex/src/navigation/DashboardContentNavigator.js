import React from 'react';
import { Switch, Route } from "react-router-dom";
import Products from "../pages/Products";
import Product from "../pages/Product";

const DashboardContentNavigator = () =>{
  return (
    <Switch>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/products/:id" component={Product}/>
    </Switch>
  );
}
export default DashboardContentNavigator;