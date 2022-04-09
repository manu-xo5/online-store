import './product.page.styles.scss';
import React, { useEffect } from 'react';
import { useCart as useCartActions } from '../../context/cart';
import { useHistory } from 'react-router-dom';
import Form, { Button } from '../../components/Form';
import useAsync from '../../hooks/useAsync';
import { fetchMobile } from '../../api-functions/mobileFiles';
import { useUser } from 'context/user';

const between = (min, max) => Math.round(min + Math.random() * (max - min));
const randomBgc = () =>
  `rgb(${between(0, 256)},${between(0, 256)},${between(0, 256)})`;

const backgroundColors = [randomBgc(), randomBgc(), randomBgc()];
const stars = between(2, 5) + between(2, 9) * 0.2;
const reviews = between(300, 500);
const deliveryTime = `${between(1, 3)}-${between(4, 5)}`;

const ProductPage = ({ match, location }) => {
  const history = useHistory();
  const { currentUser } = useUser().userState;
  const { addToCart, cart } = useCartActions();
  const [mobile, runMobile] = useAsync();
  const product = mobile.data;

  const { pid } = match.params;
  const inCart = cart.some((item) => item.pid === pid);
  const utm = new URLSearchParams(location.search).get('utm');

  function handleAddToCart(ev) {
    ev.preventDefault();
    const specs = Object.fromEntries(new FormData(ev.currentTarget));
    if (currentUser.displayName) {
      addToCart({ pid, ...specs, product });
    }
  }

  useEffect(() => {
    runMobile(fetchMobile(pid));
  }, [pid, runMobile]);

  return (
    <main id="productpage">
      {mobile.status === 'success' ? (
        <>
          <div>
            <img src={product.imgUrl} alt={pid} />
          </div>

          <div className="body">
            {utm === 'search' ? (
              <button onClick={() => history.goBack()} className="back">
                {' '}
                Back to Search Results{' '}
              </button>
            ) : null}
            <div className="cat">
              <p>Category `{product.manufacturer}`</p>
              <h1> {product.name || product.title} </h1>
            </div>
            <h4 id="reviews">
              Stars: {stars} ({reviews} Reviews)
            </h4>
            <h2>
              Price: Rs.
              <span style={{ color: 'var(--primary)' }}>{product.price}</span>
            </h2>
            <form onSubmit={handleAddToCart}>
              <p className="field-name"> Select Quality </p>
              <div className="field-group">
                <Form.Input
                  labelClass="quality"
                  label="Basic"
                  value="basic"
                  name="quality"
                  type="radio"
                />
                <Form.Input
                  labelClass="quality"
                  label="Golden"
                  value="golden"
                  name="quality"
                  type="radio"
                  defaultChecked
                />
                <Form.Input
                  labelClass="quality"
                  label="Platinum"
                  value="platinum"
                  name="quality"
                  type="radio"
                />
              </div>

              <p className="field-name"> Color </p>
              <div className="field-group">
                <Form.Input
                  label={
                    <ColorButton
                      style={{
                        display: 'inline-block',
                        backgroundColor: backgroundColors[0],
                      }}
                    />
                  }
                  type="radio"
                  name="color"
                  value="red"
                  className="colorinput"
                  defaultChecked
                />
                <Form.Input
                  label={
                    <ColorButton
                      style={{ backgroundColor: backgroundColors[1] }}
                    />
                  }
                  type="radio"
                  name="color"
                  value="yellow"
                  className="colorinput"
                />
                <Form.Input
                  label={
                    <ColorButton
                      style={{ backgroundColor: backgroundColors[2] }}
                    />
                  }
                  type="radio"
                  value="skyblue"
                  name="color"
                  className="colorinput"
                />
              </div>
              <div className="field-group">
                <p className="field-name"> Size </p>
                <Form.Input
                  label="Xs"
                  value="xs"
                  type="radio"
                  name="size"
                  defaultChecked
                />
                <Form.Input label="Sm" value="sm" type="radio" name="size" />
                <Form.Input label="Md" value="md" type="radio" name="size" />
                <Form.Input label="Lg" value="lg" type="radio" name="size" />
                <Form.Input label="Xl" value="xl" type="radio" name="size" />
              </div>

              <p className="delivery-time">
                <span className="delivery-time__head">Delivery Time:</span>{' '}
                {deliveryTime} Business days
              </p>

              {inCart ? (
                <>
                  <span>Added!</span>
                  <Button.Secondary
                    style={{ marginLeft: 10 }}
                    onClick={() => history.push('/profile/cart')}
                  >
                    Continue to Cart
                  </Button.Secondary>
                </>
              ) : (
                <Button.Primary type="submit">Add to Cart</Button.Primary>
              )}
            </form>
          </div>
        </>
      ) : mobile.status === 'loading' ? (
        <p>Loading Product Specs</p>
      ) : mobile.status === 'error' ? (
        <p>{mobile.error}</p>
      ) : null}
    </main>
  );
};

function ColorButton(props) {
  return <span {...props} className="colorbutton" />;
}

export default ProductPage;
