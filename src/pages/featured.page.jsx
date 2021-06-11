import React, { useEffect } from 'react';

import { List } from '../components/utilities';
import { FtItem } from '../components/FeaturedPage';
import { fetchFeatured } from '../api-functions/featured';
import useAsync from '../hooks/useAsync';

const FeaturedPage = () => {
  const [featured, run] = useAsync();

  useEffect(() => {
    run(fetchFeatured());
  }, [run]);

  return (
    <>
      {featured.status === 'success' ? (
        <div id="featured">
          <h2>Featured Products</h2>
          <List
            className="items"
            list={featured.data}
            render={(item, i) => <FtItem key={item} title={item} src={i + 1} />}
          />
        </div>
      ) : featured.status === 'loading' ? (
        <p>Loading</p>
      ) : featured.status === 'error' ? (
        <p>{featured.error}</p>
      ) : null}
    </>
  );
};

export default FeaturedPage;
