import * as React from "react";
import { useReducer, useContext, createContext } from "react";

const initUser = { currentUser: {}, cart: [] };
const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LoggedIn": {
      return { ...state, currentUser: action.payload.user };
    }
    case "ProfileUpdate": {
      const { firstname, lastname, ...payload } = action.payload;
      const displayName = firstname + (lastname ? ` ${lastname}` : "");
      return { ...state, currentUser: { ...payload, displayName } };
    }
    case "ADD_ITEM_TO_CART": {
      return { ...state, cart: [...state.cart, action.payload.pid] };
    }
    case "REMOVE_ITEM_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((itemId) => itemId !== action.payload.id),
      };
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

export { UserProvider, useUser };
