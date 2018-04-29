import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const MenuItem = ({ children, index, value, selected, onClick }) => (
  <li>
    <a
      className={classNames("menu-link", { "menu-link--selected": selected })}
      role="presentation"
      onClick={ev => onClick && onClick(index, value, selected)}
    >
      {children}
    </a>
  </li>
);

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default MenuItem;
