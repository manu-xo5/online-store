import React, { useEffect } from 'react';

import CatCard from '../components/LandingPage/cat-card';
import { Link } from 'react-router-dom';

import Carosel from '../components/carosel';
import { List } from '../components/utilities';
import { FtItem } from '../components/FeaturedPage';
import useAsync from '../hooks/useAsync';
import { fetchCategories } from '../api-functions/categories';
import { fetchMobileFiles } from '../api-functions/mobileFiles';

const styles = {
  CatCon: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  Tnq: {
    padding: '4rem 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
  },
};
const Home = () => {
  const [categories, runCategories] = useAsync();
  const [mobileFiles, runMobileFiles] = useAsync();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    runCategories(fetchCategories());
    runMobileFiles(fetchMobileFiles());
  }, [runCategories, runMobileFiles]);

  return (
    <>
      <div className="fadein">
        {mobileFiles.status === 'success' ? (
          <Carosel list={mobileFiles.data.all.slice(0, 4)} />
        ) : mobileFiles.status === 'loading' ? (
          <p>Loading Fresh Items</p>
        ) : mobileFiles.status === 'error' ? (
          <p>{mobileFiles.error}</p>
        ) : null}

        <section id="featured"></section>

        {mobileFiles.status === 'success' ? (
          <section id="popular">
            <div className="bar">
              <h2>Popular / Best Products</h2>
              <Link to="/featured" className="ALink">
                Show All
              </Link>
            </div>
            <div className="items">
              {mobileFiles.data.all.map((item) => (
                <FtItem
                  key={item.title || item}
                  title={item.title || item}
                  src={item.imgUrl}
                  item={item}
                />
              ))}
            </div>
          </section>
        ) : mobileFiles.status === 'loading' ? (
          <p>Loading All Mobiles</p>
        ) : mobileFiles.status === 'error' ? (
          <p>{mobileFiles.error}</p>
        ) : null}
      </div>

      {categories.status === 'loading' ? (
        <p>Loading</p>
      ) : categories.status === 'success' ? (
        <section id="category">
          <div className="bar">
            <h2>Browse by Category</h2>
          </div>
          <List
            style={styles.CatCon}
            list={categories.data}
            render={(catprops) => (
              <CatCard key={catprops.title} {...catprops} />
            )}
          />
        </section>
      ) : categories.error ? (
        <p>{categories.error}</p>
      ) : null}

      <h2 style={styles.Tnq}>Thanks for Visitin&apos;</h2>
    </>
  );
};

export default Home;
