import React from 'react';
import { RiTruckFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

let statusIndex = -1;

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  timelineWrapper: {
    marginTop: '4rem',
    marginLeft: '4rem',
    borderLeft: '.2rem solid var(--primary)',
  },
  timeline: {
    paddingTop: '3rem',
    display: 'flex',
  },
  timelineBadge: {
    marginLeft: '-1.5rem',
    flex: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    height: '3rem',
    backgroundColor: 'white',
    border: '0.2rem solid var(--primary)',
    borderRadius: '9999px',
  },
  timelineBadgeFill: {
    backgroundColor: 'var(--primary)',
    color: 'white',
  },
  status: {
    paddingLeft: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: 'solid',
    fontSize: '1.5rem',
  },
  truckIcon: {
    marginLeft: '2rem',
    animation: 'truck 100ms linear infinite alternate',
    color: 'var(--primary)',
  },
  orderDetails: {
    marginTop: '8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    fontSize: '1.2rem',
  },
  back: {
    display: 'inline-block',
    marginTop: '4rem',
    background: 'none',
    border: 'none',
    color: 'blue',
    cursor: 'pointer',
  },
};

export default () => {
  // add 1 and wrap after 3 to 0
  statusIndex = (statusIndex + 1) % 4;

  const statusLines = [
    'Order Prepared and Ready To Ship',
    'Packages Departured from Head Department',
    'Packages Reached to your local Postal Department',
    'Package Received',
  ];

  return (
    <main id="delivery-status">
      <h1>Track your Order</h1>

      <div style={styles.timelineWrapper}>
        {statusLines.map((status, idx) => (
          <div
            style={{
              ...styles.timeline,
              ...(idx === 0 ? { paddingTop: '', borderLeft: '' } : {}),
            }}
          >
            <span
              style={{
                ...styles.timelineBadge,
                ...(idx === statusIndex ? styles.timelineBadgeFill : {}),
              }}
            >
              {idx + 1}
            </span>
            <p
              style={{
                ...styles.status,
                ...(idx === statusIndex ? { color: 'var(--primary)' } : {}),
              }}
            >
              {status}{' '}
              {idx === statusIndex ? (
                <RiTruckFill style={styles.truckIcon} />
              ) : null}
            </p>
          </div>
        ))}
      </div>

      <div style={styles.orderDetails}>
        <h2>Order Details</h2>
        <p>
          <span style={{ color: 'var(--primary)' }}>Order ID:</span>{' '}
          {Math.random().toString().replace('0.', '')}
        </p>

        <p>
          <span style={{ color: 'var(--primary)' }}>Payment status:</span>{' '}
          `Pending` (cod)
        </p>

        <p style={styles.estimatedDeliveryTime}>
          <span style={{ color: 'var(--primary)' }}>Estimated Delivery:</span>{' '}
          2-3 Business Days
        </p>
      </div>

      <p>
        <Link style={styles.back} to="/profile/orders">
          Back to Orders
        </Link>
      </p>
    </main>
  );
};
