import React, { useEffect } from 'react';
import SearchCard from '../components/search/search-card.component';
import { useCart as useCartAction } from '../context/cart';
import useAsync from '../hooks/useAsync';
import { fetchMobileFiles } from '../api-functions/mobileFiles';

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
  const [mobileFiles, runMobileFiles] = useAsync();

  useEffect(() => {
    runMobileFiles(fetchMobileFiles());
  }, [runMobileFiles]);

  const query = match.params.query;
  const { cart } = useCartAction();
  return (
    <main style={styles.Container}>
      <h1 style={styles.Heading}>Showing results for "{query}"</h1>
      <ul>
        {mobileFiles.status === 'success' ? (
          mobileFiles.data.all
            .filter((product) => JSON.stringify(product).includes(query))
            .map((product) => (
              <SearchCard
                key={product.id}
                isInCart={cart.some((cartItem) => cartItem.pid === product._id)}
                {...product}
              />
            ))
        ) : mobileFiles.status === 'loading' ? (
          <p>Loading Mobiles</p>
        ) : mobileFiles.status === 'error' ? (
          <p>{mobileFiles.error}</p>
        ) : null}
      </ul>
    </main>
  );
};
export default SearchPage;
