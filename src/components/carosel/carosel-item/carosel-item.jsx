import * as React from 'react';
import { Button } from '../../Form';
import { List } from '../../utilities/utilities';
import { useNavigate } from 'react-router-dom';

import './carosel-item.scss';
const CaroselItem = ({ style, title, imgUrl, manufacturer, points, _id }) => {
  const navigate = useNavigate();

  return (
    <article className="CaroselItem">
      <h2 className="CaroselItem__title">{title}</h2>
      <img className="CaroselItem__img" src={imgUrl} alt={title} />
      <div className="CaroselItem__specs-div">
        <h2 className="CaroselItem__manufacturer">{manufacturer}</h2>
        <List
          Parent="ul"
          list={points}
          render={(point) => (
            <li
              key={point}
              className="CaroselItem__specs-li"
              children={point}
            />
          )}
        />
        <Button.Primary
          className="CaroselItem__btn"
          onClick={() => navigate(`/products/overview/${_id}`)}
        >
          Buy now
        </Button.Primary>
      </div>
    </article>
  );
};

export default CaroselItem;
