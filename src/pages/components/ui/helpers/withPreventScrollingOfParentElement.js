import React from "react";

const withPreventScrollingOfParentElement = ComposedComponent =>
  class extends React.PureComponent {
    elRef = React.createRef();

    handleMouseWheel = ev => {
      const { scrollHeight, clientHeight, scrollTop } = this.elRef.current;
      const { deltaY } = ev;

      if (
        scrollHeight !== clientHeight &&
        ((deltaY > 0 && scrollTop === scrollHeight - clientHeight) || (deltaY < 0 && scrollTop === 0))
      ) {
        ev.preventDefault();
      }
    };

    render() {
      return <ComposedComponent {...this.props} elRef={this.elRef} onMouseWheel={this.handleMouseWheel} />;
    }
  };

export default withPreventScrollingOfParentElement;
