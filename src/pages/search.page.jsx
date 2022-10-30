import React, { useEffect } from 'react';
import SearchCard from '../components/search/search-card.component';
import { useCart as useCartAction } from '../context/cart';
import useAsync from '../hooks/useAsync';
import { fetchMobileFiles } from '../api-functions/mobileFiles';
import SearchFilterSidebar from '../components/search-filter-bar';
import { useActionReducer } from '../hooks/useActionReducer';
import { useLoaderData, useParams } from 'react-router-dom';

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
    backgroundColor: 'white',
    border: 'none',
  },
  Heading: {
    margin: '3rem 0',
    fontWeight: '300',
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

export async function searchLoader() {
  let mobileFiles = await fetchMobileFiles();

  return { mobileFiles };
}

const SearchPage = () => {
  const query = useParams().query;
  const { mobileFiles } = useLoaderData();
  const { cart } = useCartAction();
  const { state: filters, actions } = useActionReducer(
    filterActions,
    initialFilters
  );

  const { price, brands, sortBy } = filters;

  const filteredMobileFilesAll = mobileFiles?.all.filter(
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
          {sortedMobileFilesAll.map((product) => (
            <li key={product.id}>
              <SearchCard
                isInCart={cart.some((cartItem) => cartItem.pid === product._id)}
                {...product}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
export default SearchPage;
