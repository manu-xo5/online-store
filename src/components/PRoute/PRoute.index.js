import * as React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'context/user';

const PRoute = ({ fallback = '/', reverse = false, ...props }) => {
  const { userState } = useUser();
  return Boolean(userState?.currentUser?.displayName) === reverse ? (
    <Redirect to={fallback} />
  ) : (
    <Route {...props} />
  );
};

export default PRoute;
