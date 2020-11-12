import React from 'react';
import { Route, Switch } from 'react-router-dom';

const VerificationNavigator = () => {
  return (
    <Switch>
        <Route exact path="/verification" component/>
        <Route/>
    </Switch>
  );
};
export default VerificationNavigator;