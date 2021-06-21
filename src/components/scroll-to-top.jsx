import { useEffect } from 'react';
import { useHistory } from 'react-router';

const ScrollToTop = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    history.listen((_, eventType) => {
      if (eventType === 'PUSH') {
        console.log('scrolling back');
        window.scrollTo(0, 0);
      }
    });
  }, [history]);

  return children;
};

export default ScrollToTop;
