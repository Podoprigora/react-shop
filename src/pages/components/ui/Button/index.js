import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = React.forwardRef(
  ({ children, primary, plain, link, size, icon, iconSize, className, style, disabled, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={classNames(
        "button",
        {
          "button-primary": primary,
          "button-plain": plain,
          "button-link": link,
          "button--disabled": !!disabled,
          [`button-size--${size}`]: !!size,
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
  )
);

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool,
  plain: PropTypes.bool,
  link: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Button;
