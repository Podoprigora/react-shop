import React from "react";
import classNames from "classnames";
import EventListener from "react-event-listener";

class ProductFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isFixedPos: false };
    this.containerRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixedPos !== this.state.isFixedPos;
  }

  handleDocumentScroll = ev => {
    const sy = window.pageYOffset || document.documentElement.sctollTop;
    this.setState({ isFixedPos: sy >= 123 && sy <= 363 });
  };

  render() {
    const { isFixedPos } = this.state;

    return (
      <div
        className={classNames("products-filters-container", {
          "container--fixed": isFixedPos
        })}
        ref={this.containerRef}
      >
        <EventListener target="document" onScroll={this.handleDocumentScroll} />
        Filters
      </div>
    );
  }
}

export default ProductFilters;
