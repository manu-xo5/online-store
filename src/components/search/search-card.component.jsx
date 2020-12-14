import React from 'react';
import { Button } from '../Form';
import { useHistory } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';

import useCartActions from 'actions/use-cart-action';

const styles = {
  Container: {
    marginBottom: '2rem',
    padding: '2rem',
    display: 'flex',
    gap: '3rem',
    border: '1px solid #aaa',
    borderRadius: 5,
  },
  Thumbnail: {
    alignSelf: 'center',
    minHeight: 250,
    minWidth: 250,
    boxShadow: '0 0 3px #555',
    borderRadius: 3,
  },

  Img: {
    display: 'block',
    borderRadius: 3,
  },
  Body: {
    padding: '.5rem',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#555',
  },
  Title: {
    color: '#222',
  },
  Actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
  },
};

const SearchCard = ({ title, desc, price, options, isInCart, id }) => {
  const { addToCart } = useCartActions();
  const history = useHistory();

  return (
    <div style={styles.Container}>
      <div style={styles.Thumbnail}>
        <img
          style={styles.Img}
          alt='place holder for product card'
          src={`//picsum.photos/250?random=${id}`}
        />
      </div>
      <div style={styles.Body}>
        <h2 style={styles.Title}>{title}</h2>
        <strong>Price - Rs.{price}</strong>
        <br />
        <p>
          <strong>Review :</strong>
          <br />
          {desc}
        </p>
        <br />
        <small>options - {options}</small>
        <div style={styles.Actions}>
          {isInCart ? (
            <Button.Primary disabled>In Cart</Button.Primary>
          ) : (
            <Button.Primary onClick={() => addToCart(id)}>
              <BsBag size='11' strokeWidth='1.1' />
            </Button.Primary>
          )}
          <Button.Secondary
            onClick={() => history.push(`/products/overview/${id}`)}
          >
            Overview
          </Button.Secondary>
        </div>
      </div>
    </div>
  );
};
export default SearchCard;
