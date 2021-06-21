import * as React from 'react';

const Carosel = ({ list, render, children }) => {
  return (
    <div className="CaroselWrapper">
      <div className="Carosel">{children}</div>
    </div>
  );
};

export default Carosel;
