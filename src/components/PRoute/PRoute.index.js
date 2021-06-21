import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'context/user';

const PRoute = ({ fallback = '/', whenUserLogged = true, ...props }) => {
  const { currentUser } = useUser().userState;
  const isLogged = Boolean(currentUser?.displayName);

  return isLogged === whenUserLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={fallback} />
  );
};

export default PRoute;
