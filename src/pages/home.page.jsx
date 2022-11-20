import React, { useEffect } from 'react';

import CatCard from '../components/LandingPage/cat-card';
import { Link, useLoaderData } from 'react-router-dom';

import Carosel from '../components/carosel';
import CaroselItem from '../components/carosel/carosel-item/carosel-item';
import { List } from '../components/utilities';
import { FtItem } from '../components/FeaturedPage';
import { fetchCategories } from '../api-functions/categories';
import { fetchMobileFiles } from '../api-functions/mobileFiles';

/** @type {{[x:string]: React.CSSProperties}} */
const styles = {
  CatCon: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '3rem',
  },
  Tnq: {
    padding: '4rem 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
  },
};

function bound(value, maxLimit) {
  return (value + maxLimit) % maxLimit;
}

export async function homeLoader() {
  let categories = await fetchCategories();
  let mobileFiles = await fetchMobileFiles();

  return { categories, mobileFiles };
}

export const HomeErrorBoundary = () => {
  return (
    <h1 style={{ textAlign: 'center', paddingBlock: '5rem', opacity: 0.2 }}>
      Failed to load data from database
    </h1>
  );
};

const Home = () => {
  const { categories, mobileFiles } = useLoaderData();
  const [count, incrementCount] = React.useReducer((count) => count + 0, 0);

  let mobileFilesLength = mobileFiles.all.length;
  const item = mobileFiles.all[bound(count, mobileFilesLength)];
  const itemPrev = mobileFiles.all[bound(count - 1, mobileFilesLength)];

  React.useEffect(() => {
    const id = setInterval(incrementCount, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <div className="fadein">
        <Carosel>
          <CaroselItem key={'-' + count} {...itemPrev} />
          <CaroselItem key={count} {...item} />
        </Carosel>

        <section id="popular">
          <div className="bar">
            <h2>Popular / Best Products</h2>
            <Link to="/featured" className="ALink">
              Show All
            </Link>
          </div>
          <div className="items">
            {mobileFiles.all.map((item) => (
              <FtItem
                key={item.title}
                title={item.title}
                src={item.imgUrl}
                item={item}
              />
            ))}
          </div>
        </section>
      </div>

      <h2 style={styles.Tnq}>Thanks for Visitin&apos;</h2>
    </>
  );
};

export default Home;
