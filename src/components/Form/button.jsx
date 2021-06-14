import React from 'react';
import Spinner from '../spinner';

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  button: {
    position: 'relative',
    overflow: 'hidden',
  },
  spinnerWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'inherit',
  },
  spinner: {
    fontSize: '1em',
  },
};

const Primary = ({ isLoading, className = '', children, ...props }) => (
  <button
    style={styles.button}
    className={className + ' primary'}
    type="button"
    {...props}
    disabled={isLoading}
  >
    {children}
    {isLoading ? (
      <div style={styles.spinnerWrapper}>
        <Spinner color="white" style={styles.spinner} />
      </div>
    ) : null}
  </button>
);

const Secondary = ({ className = '', ...props }) => (
  <button className={className + ' secondary'} type="button" {...props} />
);

export default {
  Primary,
  Secondary,
};
