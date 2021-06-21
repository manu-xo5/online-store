import React, { useEffect } from 'react';
import SearchCard from '../components/search/search-card.component';
import { useCart as useCartAction } from '../context/cart';
import useAsync from '../hooks/useAsync';
import { fetchMobileFiles } from '../api-functions/mobileFiles';
import SearchFilterSidebar from '../components/search-filter-bar';
import { useActionReducer } from '../hooks/useActionReducer';

const filterActions = {
  sortBy: (value, prev) => {
    return {
      ...prev,
      sortBy: value,
    };
  },
  minPrice: (value, prev) => {
    return {
      ...prev,
      price: {
        max: prev.price.max,
        min: value,
      },
    };
  },
  maxPrice: (value, prev) => {
    return {
      ...prev,
      price: {
        max: value,
        min: prev.price.min,
      },
    };
  },
  addBrand: (value, prev) => {
    return {
      ...prev,
      brands: [...prev.brands, value],
    };
  },
  removeBrand: (value, prev) => {
    return {
      ...prev,
      brands: prev.brands.filter((brandName) => brandName !== value),
    };
  },
};

const initialFilters = {
  sortBy: 0,
  price: { min: 0, max: 50000 },
  brands: [],
};

const styles = {
  Container: {
    display: 'flex',
    padding: 0,
  },
  Heading: {
    margin: '2rem 0',
    textAlign: 'center',
  },
};

const isInRange = (price, minPrice, maxPrice) => {
  if (price > minPrice && price <= maxPrice) return true;
};

const filterBrand = (brand, brands) => {
  // no brands selected so show all
  if (brands.length === 0) return true;

  return brands.includes(brand);
};

const SearchPage = ({ match }) => {
  const query = match.params.query;
  const [mobileFiles, runMobileFiles] = useAsync();
  const { cart } = useCartAction();
  const { state: filters, actions } = useActionReducer(
    filterActions,
    initialFilters
  );

  const { price, brands, sortBy } = filters;
  console.log(filters);

  useEffect(() => {
    runMobileFiles(fetchMobileFiles());
  }, [runMobileFiles]);

  const filteredMobileFilesAll = mobileFiles.data?.all.filter(
    (product) =>
      JSON.stringify(product).includes(query) &&
      isInRange(product.price, price.min, price.max) &&
      filterBrand(product.manufacturer, brands)
  );

  const sortedMobileFilesAll = filteredMobileFilesAll?.sort(
    (a, b) => (a.price - b.price) * sortBy
  );

  return (
    <main>
      <h1 style={styles.Heading}>Showing results for "{query}"</h1>
      <section style={styles.Container}>
        <SearchFilterSidebar filters={filters} actions={actions} />

        <ul>
          {mobileFiles.status === 'success' ? (
            sortedMobileFilesAll.map((product) => (
              // black box
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
      </section>
    </main>
  );
};
export default SearchPage;
