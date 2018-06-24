import React from "react";
import PropTypes from "prop-types";

const WindowButtons = ({ children, justifyContent }) => (
  <nav className="modal-window__buttons" style={{ justifyContent }}>
    {children}
  </nav>
);

WindowButtons.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.string
};

export default WindowButtons;
