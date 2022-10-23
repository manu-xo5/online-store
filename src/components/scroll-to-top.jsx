import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const history = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history]);

  return children;
};

export default ScrollToTop;
