import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ children, primary, style, ...props }) => (
  <button {...props} className={classNames("button", { "button-primary": primary })} style={style}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  style: PropTypes.object
};

export default Button;
