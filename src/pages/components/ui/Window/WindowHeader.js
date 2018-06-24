import React from "react";
import PropTypes from "prop-types";

const WindowHeader = ({ children, align }) => (
  <header className="modal-window__header" style={{ textAlign: align }}>
    <h2>{children}</h2>
  </header>
);

WindowHeader.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string
};

export default WindowHeader;
