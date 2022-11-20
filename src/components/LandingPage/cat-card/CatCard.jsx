import React from 'react';
import { Link } from 'react-router-dom';

import './cat-card.styles.scss';

export default ({ Icon: IconName, title }) => {
  const { [IconName]: Icon } = require('react-icons/fa');
  return (
    <Link to={`/search/${title}`}>
      <div className="cat-item">
        <Icon fontSize="48" />
        <span>{title}</span>
      </div>
    </Link>
  );
};
