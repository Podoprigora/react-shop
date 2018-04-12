import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Layout = ({ type = "hbox", children }) => {
  const className = `layout-${type}`;

  return <div className={className}>{children}</div>;
};

Layout.propTypes = {
  type: PropTypes.string,
  children: PropTypes.array
};

Layout.Flex = ({ className, children }) => (
  <div className={classNames("layout-item--flex", className)}>{React.Children.only(children)}</div>
);

Layout.Flex.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

Layout.Fixed = ({ freezed = false, className, children }) => (
  <div className={classNames(className, { "layout-item--fixed": freezed })}>{React.Children.only(children)}</div>
);

Layout.Fixed.propTypes = {
  freezed: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

export default Layout;
