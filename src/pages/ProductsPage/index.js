import React from "react";
import EventListener from "react-event-listener";
import classNames from "classnames";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isFixedFiltersContainer: false };
    this.filtersContainerRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFixedFiltersContainer !== this.state.isFixedFiltersContainer;
  }

  handleWindowScroll = ev => {
    const sy = window.pageYOffset || document.documentElement.sctollTop;
    this.setState({ isFixedFiltersContainer: sy >= 133 });
  };

  render() {
    const { isFixedFiltersContainer } = this.state;

    return (
      <div className="layout-hbox">
        <EventListener target="document" onScroll={this.handleWindowScroll} />
        <div
          className={classNames("products-filters-container", {
            "container--fixed": isFixedFiltersContainer
          })}
          ref={this.filtersContainerRef}
        >
          Filters
        </div>
        <div className="products-list-container">List</div>
      </div>
    );
  }
}

export default ProductsPage;
