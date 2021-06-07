import React from 'react';
import db from '../constants/mobileFiles.json';
import SearchCard from '../components/search/search-card.component';
import { useCart as useCartAction } from 'actions/use-cart-action';

const styles = {
  Container: {
    padding: '3rem',
  },
  Heading: {
    margin: '2rem 0',
    textAlign: 'center',
  },
};

const SearchPage = ({ match }) => {
  const query = match.params.query;
  const { cart } = useCartAction();
  return (
    <main style={styles.Container}>
      <h1 style={styles.Heading}>Showing results for "{query}"</h1>
      <ul>
        {db.all
          .filter((product) => JSON.stringify(product).includes(query))
          .map((product) => (
            <SearchCard
              key={product.id}
              isInCart={cart.some((cartItem) => cartItem.pid === product._id)}
              {...product}
            />
          ))}
      </ul>
    </main>
  );
};
export default SearchPage;
