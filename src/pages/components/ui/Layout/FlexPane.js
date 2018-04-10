import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class FlexPane extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const { className, children } = this.props;

    return <div className={classNames("layout-item--flex", className)}>{React.Children.only(children)}</div>;
  }
}

export default FlexPane;
