import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '_helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      try {
        const authToken = auth.get().token;
        if (authToken) {
          return <Component {...props} />;
        }
        throw new Error('User not found');
      } catch (error) {
        console.log(error);
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
    }}
  />
);

export default PrivateRoute;
