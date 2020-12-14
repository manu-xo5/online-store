import './Form.styles.scss';
import * as React from 'react';

export default ({ label, id, labelClass = '', ...rest }) => (
  <label
    className={`Input ${
      rest.type === 'checkbox' || rest.type === 'radio' ? 'inline' : ''
    } ${labelClass}`}
    htmlFor={id}
  >
    <input name={label} id={id} {...rest} />
    <span>{label}</span>
  </label>
);
