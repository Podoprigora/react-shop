import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const IconButton = ({ icon, children, onClick = f => f }) => (
  <button className={classNames("icon-button", "icon", icon)} onClick={onClick}>
    {children}
  </button>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default IconButton;
