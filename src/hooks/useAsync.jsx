import { useState, useCallback } from 'react';

export default () => {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  const run = useCallback((promise) => {
    setState({
      status: 'loading',
      data: null,
      error: null,
    });
    return promise
      .then((data) => {
        setState({
          status: 'success',
          data,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          status: 'error',
          data: null,
          error: error.message,
        });
      });
  }, []);

  return [state, run];
};
