import './Form.styles.scss';
import * as React from 'react';

export default ({ as: As = 'input', label, id, labelClass = '', ...rest }) => (
  <label
    className={`Input ${
      rest.type === 'checkbox' || rest.type === 'radio' ? 'inline' : ''
    } ${labelClass}`}
    htmlFor={id}
  >
    <span>{label}</span>
    <As name={label} id={id} {...rest} />
  </label>
);
