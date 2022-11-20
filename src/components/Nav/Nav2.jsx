import * as React from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './nav.styles.scss';

export default function Nav2({ ...props }) {
  return (
    <nav id="nav">
      <ul>
        <li>
          <Link to="#">Home</Link>
        </li>
        <li>
          <Link to="#">Product</Link>
        </li>
        <li>
          <Link to="#">Shop</Link>
        </li>
        <li>
          <Link to="#">Feature</Link>
        </li>
      </ul>

      <Link className="logo" to="/">
        <img src="/resources/logo1.png" alt="link to home" />
      </Link>

      <div>
        <input placeholder="Search" />

        <button>
          <FiShoppingCart fontSize="16" />
        </button>
        <button>
          <FiUser fontSize={16} />
        </button>
      </div>
    </nav>
  );
}
