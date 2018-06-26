import React from "react";
import PropTypes from "prop-types";

class WindowButtons extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    justifyContent: PropTypes.string
  };

  render() {
    const { children, justifyContent } = this.props;

    return (
      <nav className="modal-window__buttons" style={{ justifyContent }}>
        {children}
      </nav>
    );
  }
}

export default WindowButtons;
