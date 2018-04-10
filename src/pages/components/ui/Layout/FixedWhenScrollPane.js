import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ScrollContext } from "./Layout";

class FixedWhenScrollPane extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const { children, className } = this.props;

    return (
      <ScrollContext.Consumer>
        {isFixedPos => (
          <div className={classNames(className, { "layout-item--fixed": isFixedPos })}>
            {React.Children.only(children)}
          </div>
        )}
      </ScrollContext.Consumer>
    );
  }
}

export default FixedWhenScrollPane;
