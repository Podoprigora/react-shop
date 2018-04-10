import React from "react";
import PropTypes from "prop-types";
import EventListener from "react-event-listener";

const ScrollContext = React.createContext();

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    type: PropTypes.string,
    enableProcessScrollEvent: PropTypes.bool
  };

  static defaultProps = {
    type: "hbox",
    enableProcessScrollEvent: false
  };

  constructor(props) {
    super(props);

    this.state = { isFixedPos: false };
    this.componentRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixedPos !== this.state.isFixedPos;
  }

  handleDocumentScroll = ev => {
    const docHeight = document.documentElement.clientHeight;
    const { top, bottom } = this.componentRef.current.getBoundingClientRect();

    this.setState(prevState => ({
      isFixedPos: top <= 0 && bottom >= docHeight
    }));
  };

  render() {
    const { isFixedPos } = this.state;
    const { type, children, enableProcessScrollEvent } = this.props;
    const className = `layout-${type}`;

    return (
      <div className={className} ref={this.componentRef}>
        {enableProcessScrollEvent && <EventListener target="document" onScroll={this.handleDocumentScroll} />}
        <ScrollContext.Provider value={isFixedPos}>{children}</ScrollContext.Provider>
      </div>
    );
  }
}

export default Layout;

export { ScrollContext };
