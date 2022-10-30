import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './search.scss';

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  Container: {
    marginInline: '2rem',
    padding: '0.5rem',
    display: 'flex',
    gap: '1rem',
  },
  Thumbnail: {
    alignSelf: 'center',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Img: {
    display: 'block',
    width: '10rem',
    height: '10rem',
    objectFit: 'contain',
    borderRadius: 3,
  },
  Body: {
    padding: '.5rem',
    paddingTop: '1rem',
    display: 'inline-flex',
    gap: '0.2rem',
    flexDirection: 'column',
    color: '#555',
  },
  Title: {
    color: '#222',
    textTransform: 'capitalize',
    fontSize: '28px',
    lineHeight: '28px',
  },
  para: {
    fontSize: '13px',
  },
  price: {
    marginTop: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid var(--primary)',
    borderRadius: 5,
    fontSize: '13px',
    lineHeight: '13px',
    height: '2em',
    padding: '0 .5em',
  },
  Actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
  },
};

const SearchCard = ({ title, desc, price, points, isInCart, _id, imgUrl }) => {
  const navigate = useNavigate();

  return (
    <Link
      style={styles.Container}
      className="search-container"
      to={`/products/overview/${_id}?utm=search`}
    >
      <div style={styles.Thumbnail}>
        <img
          style={styles.Img}
          alt="place holder for product card"
          src={imgUrl}
        />
      </div>

      <div style={styles.Body}>
        <p style={styles.Title}>{title}</p>

        <p style={styles.para}>Options - {points.join(', ')}</p>

        <p style={styles.Actions}>
          {isInCart ? <p>In Cart!</p> : null}
          <p style={styles.price}>Rs. {price}</p>
        </p>
      </div>
    </Link>
  );
};
export default SearchCard;
