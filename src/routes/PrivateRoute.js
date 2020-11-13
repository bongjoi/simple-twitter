import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ children, ...restProps }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route {...restProps}>
      {Boolean(currentUser) ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
