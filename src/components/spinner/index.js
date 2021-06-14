import './styles.scss';
import * as React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const Spinner = (props) => {
  return <FaCircleNotch className="loading-spinner" {...props} />;
};

export default Spinner;
