import React from 'react';

const List = ({ list = [], render, className, Parent = 'div', ...restProps }) =>
  Parent === false ? (
    list.map(render)
  ) : (
    <Parent className={className} {...restProps}>
      {list.map(render)}
    </Parent>
  );

export default List;
