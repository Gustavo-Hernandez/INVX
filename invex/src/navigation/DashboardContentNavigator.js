import React from 'react';
import { Switch, Route } from "react-router-dom";
import Products from "../pages/Products";
import Product from "../pages/Product";
import LowStock from "../pages/LowStock";

const DashboardContentNavigator = () =>{
  return (
    <Switch>
        <Route exact path="/lowstock" component={LowStock}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/products/:id" component={Product}/>
    </Switch>
  );
}
export default DashboardContentNavigator;