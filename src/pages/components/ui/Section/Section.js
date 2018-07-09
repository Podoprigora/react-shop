import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Section = ({ children, className, style }) => (
  <section className={classNames("section", className)}>{children}</section>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Section;
