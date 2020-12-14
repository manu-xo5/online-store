import './nav.styles.scss';
import React from 'react';
import { useUser } from 'context/user';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { ALink } from '../utilities/utilities';
import SeacrhInput from '../search/search-box.component';
import AvatarImg from '../../assets/avatar.jpg';

const User = ({ user }) => {
  const { userState } = useUser();
  const { displayName, photoURL } = userState.currentUser;
  const text = displayName || 'SignIn';
  const image = photoURL || AvatarImg;
  const isLogged = Boolean(displayName);
  return (
    <div className='user-avator'>
      <Link to='/profile/cart'>
        <FiShoppingCart fontSize='24' />
      </Link>
      <div className='dropdown'>
        <ALink
          className='wrap'
          to={displayName ? '/profile/basicinfo' : '/signin'}
        >
          {text}
          <img
            referrerPolicy='no-referrer'
            className='avator'
            src={image}
            alt='avatar'
          />
        </ALink>
        {isLogged ? (
          <ul className='dropdown__menu'>
            <li>
              <Link to='/profile/basicinfo'>NoName</Link>
            </li>
            <li>
              <Link to='/profile/cart'>Cart</Link>
            </li>
            <li>
              <Link to='#'>Purchase History</Link>
            </li>
            <li>
              <Link to='/'>Sign Out</Link>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <header id='main'>
      <div className='ActionBar'>
        <img src='/resources/logo1.png' alt='logo1' />
        <SeacrhInput />
        <User />
      </div>
      <nav className='Nav'>
        <ALink to='/'>Home</ALink>
        <ALink to='/brands/oppo'>
          <span className='New'>NEW</span>
          Oppo
        </ALink>
        <ALink to='/brands/vivo'>Vivo</ALink>
        <ALink to='/brands/redmi'>Redmi</ALink>
        <ALink to='/contact'>Contact Us</ALink>
      </nav>
    </header>
  );
};

export default Nav;
