import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer';
import Nav from '../Nav/nav.component';
import Routes from '../routes';

const App = () => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Nav />
      <Routes />
      <Footer />
    </>
  );
};

export default App;
