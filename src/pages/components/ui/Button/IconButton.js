import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const IconButton = ({ icon, onClick = f => f }) => (
  <button className={classNames("icon-button", "icon", icon)} onClick={onClick} />
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default IconButton;
