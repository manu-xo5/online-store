import * as React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useUser } from 'context/user';

const PRoute = ({ fallback = '/', whenUserLogged = true, ...props }) => {
  const { currentUser } = useUser().userState;
  const isLogged = Boolean(currentUser?.displayName);
  const navigate = useNavigate();

  if (!isLogged) navigate(fallback)
  
  return props.children;
};

export default PRoute;
