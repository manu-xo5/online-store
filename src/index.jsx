import React from 'react';
import ReactDom from 'react-dom';
import { UserProvider } from './context/user';
import './style.scss';

import App from 'components/app';
import { CartProvider } from './context/cart';

ReactDom.render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>,
  document.getElementById('root')
);
