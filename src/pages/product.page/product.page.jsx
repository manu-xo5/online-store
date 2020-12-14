import './product.page.styles.scss';

import React from 'react';

import useCartActions from 'actions/use-cart-action';
import { useUser } from 'context/user';
import Form, { Button } from '../../components/Form';

import { SearchDB, CAROSEL_ITEMS } from '../../constants/fake-database';

const DB = new Map();
window.DB = DB;
JSON.parse(SearchDB).forEach(item => {
  DB.set(item.id, item);
});
CAROSEL_ITEMS.forEach(item => {
  DB.set(item.id.toString(), item);
});

const randBgc = () => {
  const ran = () => Math.floor(Math.random() * 256);
  return {
    backgroundColor: `rgb(${ran()},${ran()},${ran()})`,
  };
};

const ProductPage = ({ match }) => {
  const { pid } = match.params;
  const product = DB.get(pid);

  const cart = useCartActions();
  const { userState } = useUser();
  const inCart = userState.cart.includes(pid);

  const stars = (Math.random() + 4).toFixed(1);
  const reviews = (Math.random() + 500).toFixed();

  function addToCart(ev) {
    ev.preventDefault();
    const fd = new FormData();
    for (const elem in ev.elements) {
      fd.append(elem.name, elem.value);
    }
    console.log(fd, { t: ev.target });
    // cart.addToCart(pid);
  }

  return (
    <main id='productpage'>
      <div>
        <img src='//picsum.photos/512' alt={pid} />
      </div>
      <div className='body'>
        <button className='back'> Back to Search Results </button>
        <div className='cat'>
          <p>Category</p>
          <h1> {product.name || product.title} </h1>
        </div>
        <h4 id='reviews'>
          Stars: {stars} ({reviews} Reviews)
        </h4>
        <form onSubmit={addToCart}>
          <div className='field-group'>
            <p className='field-name'> Select Quality </p>
            <Form.Input
              labelClass='quality'
              label='Basic'
              value='basic'
              name='quality'
              type='radio'
            />
            <Form.Input
              labelClass='quality'
              label='Golden'
              value='golden'
              name='quality'
              type='radio'
              defaultChecked
            />
            <Form.Input
              labelClass='quality'
              label='Platinum'
              value='platinum'
              name='quality'
              type='radio'
            />
          </div>
          <div className='field-group'>
            <p className='field-name'> Style </p>
            <Form.Input
              label={<ColorButton />}
              type='radio'
              name='color'
              value='red'
              className='colorinput'
              defaultChecked
            />
            <Form.Input
              label={<ColorButton />}
              type='radio'
              name='color'
              value='yellow'
              className='colorinput'
            />
            <Form.Input
              label={<ColorButton />}
              type='radio'
              value='skyblue'
              name='color'
              className='colorinput'
            />
          </div>
          <div className='field-group'>
            <p className='field-name'> Size </p>
            <Form.Input
              label='Xs'
              value='xs'
              type='radio'
              name='size'
              defaultChecked
            />
            <Form.Input label='Sm' value='sm' type='radio' name='size' />
            <Form.Input label='Md' value='md' type='radio' name='size' />
            <Form.Input label='Lg' value='lg' type='radio' name='size' />
            <Form.Input label='Xl' value='xl' type='radio' name='size' />
          </div>
          {inCart ? (
            <Button.Primary className='add-to-cart'>Added !</Button.Primary>
          ) : (
            <Button.Primary>Add to Cart</Button.Primary>
          )}
        </form>
      </div>
    </main>
  );
};

function ColorButton() {
  return <span style={randBgc()} className='colorbutton' />;
}

export default ProductPage;
