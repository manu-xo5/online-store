import React from 'react';
import { List } from 'components/utilities';
import { Button } from 'components/Form';
import { useCart } from '../../../context/cart';
import { useUser, addOrders } from 'context/user';

export default () => {
  const { cart, removeFromCart, emptyCart } = useCart();
  const {
    dispatch,
    userState: { currentUser },
  } = useUser();

  const totalCost = cart.reduce((total, item) => total + item.product.price, 0);

  const handleCheckout = () => {
    const orders = cart.map((cartItem) => ({
      ...cartItem,
      orderedOn: new Date().toISOString(),
    }));

    if (totalCost > currentUser.balance) {
      console.log('Not Enough Balance');
      return;
    }

    addOrders(dispatch, orders);
    emptyCart();
  };

  if (cart.length === 0) return <h1>No Item in Cart</h1>;

  return (
    <main id="cart">
      <h1>Cart</h1>
      <List
        Parent={false}
        list={cart}
        render={({
          product: { title, imgUrl, manufacturer, price },
          color,
          quality,
          size,
          pid,
        }) => (
          <article key={pid}>
            <img src={imgUrl || '//picsum.photos/300'} alt={title} />
            <div>
              <h2>{title}</h2>
              <p>{manufacturer}</p>
              <p>Color: {color}</p>
              <p>Quality: {quality}</p>
              <p>Size: {size}</p>
              <br />
              <h3>Price: {price || Math.floor(Math.random() * 500)}</h3>
              <div>
                <Button.Secondary onClick={() => removeFromCart(pid)}>
                  Remove
                </Button.Secondary>
              </div>
            </div>
          </article>
        )}
      />
      <div>
        <p>
          Total: <span style={{ color: 'var(--primary)' }}>Rs.{totalCost}</span>
        </p>
        <Button.Primary onClick={handleCheckout}>Checkout</Button.Primary>{' '}
      </div>
    </main>
  );
};
