import React from 'react';
import SearchCard from '../components/search/search-card.component';
import { useCart as useCartAction } from '../context/cart';
import { fetchMobileFiles } from '../api-functions/mobileFiles';
import SearchFilterSidebar from '../components/search-filter-bar';
import {
  useActionData,
  useLoaderData,
  useLocation,
  useParams,
} from 'react-router-dom';

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

export async function searchAction() {}

const SearchPage = () => {
  const query = useParams().query;
  const { mobileFiles } = useLoaderData();
  useActionData();
  const { cart } = useCartAction();

  const urlParams = new URLSearchParams(useLocation()?.search);

  const brands = urlParams.getAll('brand');
  const sortBy = urlParams.get('sortBy');
  const price = {
    min: urlParams.get('price_min'),
    max: urlParams.get('price_max'),
  };

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
        <SearchFilterSidebar filters={{ price, sortBy, brands }} />

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
