import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const SectionContent = ({ children, className, ...props }) => (
  <div className={classNames("section__body", className)}>{children}</div>
);

SectionContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default SectionContent;
