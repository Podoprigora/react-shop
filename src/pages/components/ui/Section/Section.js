import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Section = React.forwardRef(({ children, className, ...props }, ref) => (
  <section className={classNames("section", className)} ref={ref} {...props}>
    {children}
  </section>
));

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Section;
