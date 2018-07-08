import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ children, primary, plain, icon, iconSize, className, style, ...props }) => (
  <button
    {...props}
    className={classNames(
      "button",
      {
        "button-primary": primary,
        "button-plain": plain,
        "button-icon": !!icon,
        icon: !!icon,
        [`icon-size-${iconSize}`]: !!iconSize,
        [icon]: !!icon
      },
      className
    )}
    style={style}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  plain: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object
};

export default Button;
