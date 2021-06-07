import React from 'react';

const Button = {
  Primary: ({ className = '', ...props }) => (
    <button className={className + ' primary'} type="button" {...props} />
  ),
  Secondary: ({ className = '', ...props }) => (
    <button className={className + ' secondary'} type="button" {...props} />
  ),
};

export default Button;
