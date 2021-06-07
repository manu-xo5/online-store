import React from 'react';
import { Link } from 'react-router-dom';

export default ({ href, children, ...props }) =>
  href ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link {...props}>{children}</Link>
  );
