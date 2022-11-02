import { emptyOrders, useUser } from 'context/user';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Form';
import * as React from "react"

export default () => {
  const { userState, dispatch } = useUser();

  const orders = userState?.orders || null;

  const handleClearOrders = () => {
    emptyOrders(dispatch);
  };

  return (
    <main id="orders">
      {orders == null ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <>
          <h1 style={{ width: 'fit-content', margin: '0 auto' }}>
            Orders History
          </h1>
          {orders.map(
            ({
              product: { title, imgUrl, manufacturer, price },
              color,
              quality,
              size,
              pid,
              orderedOn,
            }) => (
              <article
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  padding: '2.5rem 0',
                  borderBottom: '1px solid rgba(0 0 0 / 0.1)',
                }}
                key={pid}
              >
                <img
                  src={imgUrl}
                  alt={title}
                  style={{
                    height: '15rem',
                    placeSelf: 'center',
                    mixBlendMode: 'multiply',
                  }}
                />
                <div style={{ marginTop: '2rem' }}>
                  <h2>{title}</h2>
                  <p>{manufacturer}</p>
                  <small>
                    Ordered on {new Date(orderedOn).toLocaleDateString('en-IN')}
                  </small>
                  <p>Color: {color}</p>
                  <p>Quality: {quality}</p>
                  <p>Size: {size}</p>
                  <br />
                  <h3>Price: {price || Math.floor(Math.random() * 500)}</h3>
                </div>
              </article>
            )
          )}

          <div
            style={{ display: 'flex', marginTop: '5rem', alignItems: 'center' }}
          >
            <Button.Primary onClick={handleClearOrders}>
              Clear History
            </Button.Primary>

            <Link
              style={{
                marginLeft: '2rem',
                color: 'blue',
              }}
              to="/profile/orders/delivery-status"
            >
              Delivery Status
            </Link>
          </div>
        </>
      ) : (
        <p>No Orders!</p>
      )}
    </main>
  );
};
