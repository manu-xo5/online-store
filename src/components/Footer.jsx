import React from 'react';
import { ALink } from './utilities/utilities';

const Footer = () => (
  <footer>
    <h3
      className='BackToTop'
      onClick={() => (document.documentElement.scrollTop = 0)}
    >
      Back to Top
    </h3>
    <header>
      <img src='/resources/logo1.png' alt='logo' />
      <h3>the Online Store</h3>
    </header>
    <div className='about'>
      <div>
        <ALink to='/about'>
          <h3>About</h3>
        </ALink>
        <p>
          The Online Store, made by Mohit &#40;mohit-matwaya@github.com&#41;
          using ReactJS during covid-19 pandemic, purely made for educational
          purpose and none of the info and images are not owned by me i.e.
          Mohit.
        </p>
        <br />
        <img src='/resources/cards.png' alt='smart cards' />
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <ALink to='/profile/account'>My Account</ALink>
          </li>
          <li>
            <ALink to='/cart'>Cart</ALink>
          </li>
          <li>
            <ALink to='/profile/order'>Track Orders</ALink>
          </li>
          <li>
            <ALink to='/profile/signout'>SignOut</ALink>
          </li>
          <li>
            <ALink href='//github.com/manu-xo5/'>Our Blog</ALink>
          </li>
        </ul>
      </div>
      <div>
        <h3>H.O. Address</h3>
        <p>the Online Store Ltd</p>
        <p>Over WhiteStones, DirtLake</p>
        <p>+91 9988 765 321</p>
        <p>theonlinestore@example.com</p>
      </div>
    </div>
  </footer>
);

export default Footer;
