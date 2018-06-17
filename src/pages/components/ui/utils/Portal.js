import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);

    this.portalContainerEl = document.body;
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.portalContainerEl);
  }
}

export default Portal;
