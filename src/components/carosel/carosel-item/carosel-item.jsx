import * as React from 'react';
import { Button } from '../../Form';
import { List } from '../../utilities/utilities';
import { useHistory } from 'react-router-dom';

import './carosel-item.scss';
const CaroselItem = ({ style, title, imgUrl, manufacturer, points, _id }) => {
  const history = useHistory();

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
          style={{
            marginTop: '3rem',
            padding: '1rem 2rem',
            color: 'var(--primary)',
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: 0,
            border: '3px solid var(--primary)',
            backgroundColor: 'transparent',
          }}
          onClick={() => history.push(`/products/overview/${_id}`)}
        >
          Buy now
        </Button.Primary>
      </div>
    </article>
  );
};

export default CaroselItem;
