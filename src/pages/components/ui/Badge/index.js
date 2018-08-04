import React from "react";
import PropTypes from "prop-types";

const Badge = ({ children, content, ...other }) => (
  <div style={{ position: "relative" }}>
    {children}
    <span className="badge" {...other}>
      {content}
    </span>
  </div>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
};

export default Badge;
