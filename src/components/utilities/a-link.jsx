import React from "react";
import { Link } from "react-router-dom";

export default ({ chidlren, ...props }) =>
  props.href ? <a {...props}>{chidlren}</a> : <Link {...props} />;
