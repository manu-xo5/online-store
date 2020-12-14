import * as React from 'react';
import CaroselItem from './carosel-item/carosel-item';

const Carosel = ({ list, render }) => {
  const [count, send] = React.useReducer((count, action) => {
    return (count + 1 + list.length) % list.length;
  }, 0);

  React.useEffect(() => {
    const _id = setInterval(send, 5000);
    return () => clearInterval(_id);
  }, []);

  const itemPrev = list[(count - 1 + list.length) % list.length];
  const item = list[count];

  return (
    <div className='CaroselWrapper'>
      <div className='Carosel'>
        <CaroselItem key={'-' + count} {...itemPrev} />
        <CaroselItem key={count} {...item} />
      </div>
    </div>
  );
};

export default Carosel;
