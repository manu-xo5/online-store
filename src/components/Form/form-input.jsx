import './Form.styles.scss';
import * as React from 'react';

/**
 * @typedef FormInputProps
 * @property {string} as
 * @property {string} label
 * @property {string} id
 * @property {string} [labelClass = '']
 * @property {boolean} inline,
 */

/** @type {React.FC.<FormInputProps | HTMLInputElement>} */
const FormInput = ({
  as: As = 'input',
  label,
  id,
  labelClass = '',
  labelStyle,
  inline,
  ...rest
}) => {
  const shouldInline =
    inline || rest.type === 'checkbox' || rest.type === 'radio';
  // works when inline
  const shouldShowLabel = inline && !label ? false : true;
  const isToggleControl = rest.type === 'checkbox' || rest.type === 'radio';
  return (
    <label
      style={labelStyle}
      className={`Input ${shouldInline ? 'inline' : ''} ${labelClass}`}
      htmlFor={id}
    >
      {!isToggleControl ? <span>{label}</span> : null}
      <As name={label} id={id} {...rest} />
      {isToggleControl ? <span>{label}</span> : null}
    </label>
  );
};

export default FormInput;
