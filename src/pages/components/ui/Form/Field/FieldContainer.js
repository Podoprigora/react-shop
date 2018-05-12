import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const FieldContainer = ({ children, layout, ...props }) => (
  <div
    className={classNames("field-container", { "layout-hbox": layout === "hbox", "layout-vbox": layout === "vbox" })}
    {...props}
  >
    {children}
  </div>
);

FieldContainer.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(["hbox", "vbox"])
};

FieldContainer.defaultProps = {
  layout: "hbox"
};

export default FieldContainer;
