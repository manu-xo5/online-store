import React from 'react';
import { List } from 'components/utilities';
import { Button, Input } from 'components/Form';
import { useCart } from '../../../context/cart';
import { useUser, addOrders } from '../../../context/user';
import { Link, useNavigate } from 'react-router-dom';
import './cart-page.scss';

export default () => {
  let { cart, removeFromCart, emptyCart } = useCart();
  let navigate = useNavigate();
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
    if (!currentUser.displayName) {
      console.log('Sign In requried to place order');
      return;
    }

    if (totalCost > currentUser.balance) {
      console.log('Not Enough Balance');
      return;
    }

    addOrders(dispatch, orders);
    emptyCart();
    navigate('/profile/orders');
  };

  let ChevronRight = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path>
    </svg>
  );

  if (cart.length === 0)
    return (
      <main id="cart">
        <div className="container">
          <h1>Online store</h1>

          <p className="byline">
            The checkout page you are looking for does not exist
          </p>
          <p>
            The URL you entered may be deleted or not available. Return to the
            home page to continue shopping
          </p>
          <Link to="/">online store</Link>
        </div>
      </main>
    );

  return (
    <main id="cart">
      <div className="shipping-form">
        <h1>
          <Link to="/">Online store</Link>
        </h1>

        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          {ChevronRight}
          <Link to="/profile">Profile</Link>
          {ChevronRight}
          Cart
        </div>

        <form className="form">
          <p className="contact-heading">Contact information</p>
          <Input placeholder="Enter email or mobile phone number" />

          <Input type="checkbox" label="Email me with news and offers" />

          <p className="shipping-address-heading">Shipping address</p>

          <Input value="Country - India" disabled />

          <div className="grid">
            <Input placeholder="State" />
            <Input placeholder="City" />
            <Input placeholder="Pincode" />
          </div>

          <div className="grid">
            <Input placeholder="First name" />
            <Input placeholder="Last name (Optional)" />
          </div>

          <Input placeholder="Address" />

          <Input type="checkbox" label="Save this information for next time" />

          <Button.Primary onClick={handleCheckout}>
            Continue to shipping
          </Button.Primary>
        </form>

        <p className="footer-text">All rights reserved online store</p>
      </div>

      <div className="product-list">
        {cart.map(
          ({
            product: { title, imgUrl, manufacturer, price },
            color,
            quality,
            size,
            pid,
          }) => (
            <article key={pid}>
              <img src={imgUrl || '//picsum.photos/300'} alt={title} />
              <div>
                <h2>
                  {manufacturer} {title}
                </h2>
                <p>Color: {color}</p>
                <p>Quality: {quality}</p>
                <p>Size: {size}</p>
                <Button.Secondary onClick={() => removeFromCart(pid)}>
                  Remove
                </Button.Secondary>
              </div>
              <p className="price">
                ${price || Math.floor(Math.random() * 500)}
              </p>
            </article>
          )
        )}

        <div className="subtotal">
          <p>
            Subtotal: <span>${totalCost}</span>
          </p>
          <p>
            Shippping: <span>$200</span>
          </p>
        </div>

        <div className="total">
          <p>
            Total: <span>${totalCost + 200}</span>
          </p>
        </div>
      </div>
    </main>
  );
};
