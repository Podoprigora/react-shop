import React from "react";
import PropTypes from "prop-types";

const WindowContent = ({ children }) => <section className="modal-window__content">{children}</section>;

WindowContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default WindowContent;
