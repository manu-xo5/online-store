import * as React from 'react';
import { useReducer, useContext, createContext } from 'react';

const initUser = { currentUser: {}, orders: [] };
const UserContext = createContext(initUser);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LoggedIn': {
      return { ...state, currentUser: action.payload.user };
    }
    case 'ProfileUpdate': {
      const { firstname, lastname, ...payload } = action.payload;
      const displayName = firstname + (lastname ? ` ${lastname}` : '');
      return { ...state, currentUser: { ...payload, displayName } };
    }
    case 'ADD_ORDERS': {
      state.orders.push(...action.payload);
      return { ...state };
    }
    case 'CLEAR_ORDERS': {
      state.orders = [];
      return { ...state };
    }
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initUser);
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

const addOrders = (dispatch, orders) => {
  dispatch({ type: 'ADD_ORDERS', payload: orders });
};

const emptyOrders = (dispatch) => {
  dispatch({ type: 'CLEAR_ORDERS' });
};

export { UserProvider, useUser, addOrders, emptyOrders };
