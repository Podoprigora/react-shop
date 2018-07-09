import React from "react";
import PropTypes from "prop-types";
import EventListener from "react-event-listener";

class DocumentScroll extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = { isEnter: false };

  containerRef = React.createRef();

  handleDocumentScroll = ev => {
    const { top, bottom, height } = this.containerRef.current.getBoundingClientRect();
    const docHeight = document.documentElement.clientHeight;

    this.setState({
      isEnter: top <= 0 && bottom > docHeight,
      top,
      bottom
    });
  };

  render() {
    const { isEnter } = this.state;

    return (
      <div ref={this.containerRef}>
        <EventListener target="document" onScroll={this.handleDocumentScroll} />
        {this.props.children(this.state)}
      </div>
    );
  }
}

export default DocumentScroll;
