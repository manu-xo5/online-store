import React from "react";
import { SearchDB } from "../constants/fake-database";
import SearchCard from "../components/search/search-card.component";
import useCartAction from "actions/use-cart-action";
const db = JSON.parse(SearchDB);

const styles = {
  Container: {
    padding: "3rem",
  },
  Heading: {
    margin: "2rem 0",
    textAlign: "center",
  },
};

const SearchPage = ({ match }) => {
  const query = match.params.query;
  const { cart } = useCartAction();
  return (
    <main style={styles.Container}>
      <h1 style={styles.Heading}>Showing results for "{query}"</h1>
      <ul>
        {db.map((product) => (
          <SearchCard
            key={product.id}
            isInCart={cart.includes(product.id)}
            {...product}
          />
        ))}
      </ul>
    </main>
  );
};
export default SearchPage;
