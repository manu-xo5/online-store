import React from "react";

const Button = {
  Primary: ({ className = "", ...props }) => (
    <button className={className + " primary"} {...props} />
  ),
  Secondary: ({ className = "", ...props }) => (
    <button className={className + " secondary"} {...props} />
  ),
};

export default Button;
