import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = props => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to='/dnsFrontend/splash' />
  }
  return <Route { ...props } />;
}

export default ProtectedRoute;
