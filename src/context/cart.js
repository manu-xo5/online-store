import * as React from 'react';

const CartContext = React.createContext([]);

export const CartProvider = ({ children }) => {
  const cartState = React.useState([]);
  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const [cart, setCart] = React.useContext(CartContext);

  const addToCart = (cartProduct) => {
    setCart((state) => [cartProduct, ...state]);
  };

  const removeFromCart = (pid) => {
    setCart((state) => state.filter((cartItem) => cartItem.pid !== pid));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    emptyCart,
  };
};
