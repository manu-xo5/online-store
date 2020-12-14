import React, { useEffect } from 'react';

import CatCard from '../components/LandingPage/cat-card';
import { Link } from 'react-router-dom';

import Carosel from '../components/carosel';
import { List } from '../components/utilities';
import { FtItem } from '../components/FeaturedPage';
import {
  FT_ITEMS,
  CAROSEL_ITEMS,
  MainCategories,
} from '../constants/fake-database';

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
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <div className='fadein'>
        <Carosel list={CAROSEL_ITEMS.slice(0, 4)} />
        <section id='featured'></section>
        <section id='popular'>
          <div className='bar'>
            <h2>Popular / Best Products</h2>
            <Link to='/featured' className='ALink'>
              Show All
            </Link>
          </div>
          <div className='items'>
            {CAROSEL_ITEMS.map((item, index) => (
              <FtItem
                key={item.title || item}
                title={item.title || item}
                src={item.imgUrl}
                item={item}
              />
            ))}
          </div>
        </section>
      </div>
      <section id='category'>
        <div className='bar'>
          <h2>Browse by Category</h2>
        </div>
        <List
          style={styles.CatCon}
          list={MainCategories}
          render={catprops => <CatCard key={catprops.title} {...catprops} />}
        />
      </section>

      <h2 style={styles.Tnq}>Thanks for Visitin'</h2>
    </>
  );
};

export default Home;
