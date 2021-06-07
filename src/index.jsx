import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user';
import './style.scss';

import App from 'components/app';
import { CartProvider } from 'actions/use-cart-action';
ReactDom.render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
