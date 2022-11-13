import { useUser } from 'context/user';
import * as React from 'react';
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMobile } from '../../api-functions/mobileFiles';
import MyForm, { Button } from '../../components/Form';
import { useCart as useCartActions } from '../../context/cart';
import './product.page.styles.scss';

const between = (min, max) => Math.round(min + Math.random() * (max - min));
const randomBgc = () =>
  `rgb(${between(0, 256)},${between(0, 256)},${between(0, 256)})`;

const backgroundColors = [randomBgc(), randomBgc(), randomBgc()];
const stars = between(2, 5) + between(2, 9) * 0.2;
const reviews = between(300, 500);
const deliveryTime = `${between(1, 3)}-${between(4, 5)}`;

export async function productLoader({ params }) {
  const { pid } = params;

  return { product: await fetchMobile(pid) };
}

const ProductPage = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { product } = useLoaderData();
  const location = useLocation();
  const { currentUser } = useUser().userState;
  const { addToCart, cart } = useCartActions();

  const inCart = cart.some((item) => item.pid === pid);
  const utm = new URLSearchParams(location.search).get('utm');

  function handleAddToCart(ev) {
    ev.preventDefault();
    const specs = Object.fromEntries(new FormData(ev.currentTarget));
    if (currentUser.displayName) {
      addToCart({ pid, ...specs, product });
    }
  }

  return (
    <main id="productpage">
      <div>
        <img src={product.imgUrl} alt={pid} />
      </div>

      <div className="body">
        {utm === 'search' ? (
          <button onClick={() => navigate(-1)} className="back">
            Back to Search Results
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
          <input type="hidden" value={pid} name="pid" />
          <div className="field-group">
            <MyForm.Input
              labelClass="quality"
              label="Basic"
              value="basic"
              name="quality"
              type="radio"
            />
            <MyForm.Input
              labelClass="quality"
              label="Golden"
              value="golden"
              name="quality"
              type="radio"
              defaultChecked
            />
            <MyForm.Input
              labelClass="quality"
              label="Platinum"
              value="platinum"
              name="quality"
              type="radio"
            />
          </div>

          <p className="field-name"> Color </p>
          <div className="field-group">
            <MyForm.Input
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
            <MyForm.Input
              label={
                <ColorButton style={{ backgroundColor: backgroundColors[1] }} />
              }
              type="radio"
              name="color"
              value="yellow"
              className="colorinput"
            />
            <MyForm.Input
              label={
                <ColorButton style={{ backgroundColor: backgroundColors[2] }} />
              }
              type="radio"
              value="skyblue"
              name="color"
              className="colorinput"
            />
          </div>

          <p className="field-name"> Size </p>
          <div className="field-group">
            <MyForm.Input
              label="Xs"
              value="xs"
              type="radio"
              name="size"
              defaultChecked
            />
            <MyForm.Input label="Sm" value="sm" type="radio" name="size" />
            <MyForm.Input label="Md" value="md" type="radio" name="size" />
            <MyForm.Input label="Lg" value="lg" type="radio" name="size" />
            <MyForm.Input label="Xl" value="xl" type="radio" name="size" />
          </div>

          <p className="delivery-time">
            <span className="delivery-time__head">Delivery Time:</span>{' '}
            {deliveryTime} Business days
          </p>

          {
            // is logged in ?
            currentUser.displayName == null ? (
              <p style={{ marginTop: '2rem' }}>
                <span>Sign in to place order</span>

                <Link
                  style={{
                    marginLeft: '1rem',
                    padding: '.25rem 1rem',
                    border: '.1rem solid rgba(0 0 0 / 0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    borderRadius: '5px',
                  }}
                  to="/signin"
                >
                  Sign In
                </Link>
              </p>
            ) : inCart ? (
              // is in cart ?
              <>
                <span>Added!</span>
                <Button.Secondary
                  style={{ marginLeft: 10 }}
                  onClick={() => navigate('/profile/cart')}
                >
                  Continue to Cart
                </Button.Secondary>
              </>
            ) : (
              <Button.Primary type="submit">Add to Cart</Button.Primary>
            )
          }
        </form>
      </div>
    </main>
  );
};

function ColorButton(props) {
  return <span {...props} className="colorbutton" />;
}

export default ProductPage;
