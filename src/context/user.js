import * as React from 'react';
import { useReducer, useContext, createContext } from 'react';

const initUser = { currentUser: {
  uid: 534870928,
  displayName: 'Admin',
  email: "admin@admin.com",
  photoURL: "/static/img/avatar.png",
  balance: 60000,
}, orders: [] };
const UserContext = createContext({
  userState: initUser,
  dispatch: () => {},
});

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
      const orders = action.payload;
      const totalCost = orders.reduce(
        (total, item) => total + item.product.price,
        0
      );
      state.currentUser.balance -= totalCost;
      state.orders.push(...orders);
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

const addOrders = (userDispatch, orders) => {
  userDispatch({ type: 'ADD_ORDERS', payload: orders });
};

const emptyOrders = (dispatch) => {
  dispatch({ type: 'CLEAR_ORDERS' });
};

export { UserProvider, useUser, addOrders, emptyOrders };
