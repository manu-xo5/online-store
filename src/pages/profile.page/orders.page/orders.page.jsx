import { useUser, emptyOrders } from 'context/user';
import { Button } from '../../../components/Form';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const { userState, dispatch } = useUser();
  const history = useHistory();

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
          {' '}
          {orders.map(
            ({
              product: { title, imgUrl, manufacturer, price },
              color,
              quality,
              size,
              pid,
              orderedOn,
            }) => (
              <article style={{ display: 'flex' }} key={pid}>
                <img src={imgUrl} alt={title} />
                <div>
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button.Primary onClick={handleClearOrders}>
              Clear History
            </Button.Primary>
            <Button.Secondary
              onClick={() => history.push('/profile/orders/delivery-status')}
            >
              Delivery Status
            </Button.Secondary>
          </div>
        </>
      ) : (
        <p>No Orders!</p>
      )}
    </main>
  );
};
