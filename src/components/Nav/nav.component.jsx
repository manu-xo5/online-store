import './nav.styles.scss';
import React from 'react';
import { useUser } from 'context/user';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

import { ALink } from '../utilities/utilities';
import SeacrhInput from '../search/search-box.component';
import { useCart } from 'context/cart';

const AvatarImg = '/static/img/avatar.jpg';

const User = () => {
  const { userState } = useUser();
  let { cart } = useCart();
  const { displayName, photoURL } = userState.currentUser;
  const text = displayName || 'SignIn';
  const image = photoURL || AvatarImg;
  const isLogged = Boolean(displayName);
  return (
    <div className="user-avator">
      <Link to="/profile/cart" className="cart-icon-link">
        <FiShoppingCart fontSize="24" />
        {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
      </Link>
      <div className="dropdown">
        <span className="wrap">
          <FiUser fontSize={24} />
        </span>
        {isLogged ? (
          <ul className="dropdown__menu">
            <li>
              <Link to="/profile/basicinfo">{displayName}</Link>
            </li>
            <li>
              <Link to="/profile/cart">Cart</Link>
            </li>
            <li>
              <Link to="/profile/orders">Orders</Link>
            </li>
            <li>
              <Link to="/">Sign Out</Link>
            </li>
          </ul>
        ) : (
          <ul className="dropdown__menu">
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <header id="main">
      <div className="ActionBar">
        <img src="/resources/logo1.png" alt="logo1" />
        <SeacrhInput />
        <User />
      </div>
      <nav className="Nav">
        <ALink to="/">Home</ALink>
        <ALink to="/brands/oppo">
          <span className="New">NEW</span>
          Oppo
        </ALink>
        <ALink to="/brands/vivo">Vivo</ALink>
        <ALink to="/brands/redmi">Redmi</ALink>
        <ALink to="/contact">Contact Us</ALink>
      </nav>
    </header>
  );
};

export default Nav;
