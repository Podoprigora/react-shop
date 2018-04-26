import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";
import LinearProgress from "../../components/ui/Progress/Linear";
import api from "../../../modules/api";

class ProductList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  };

  state = {
    isFetching: false,
    data: this.props.data,
    total: this.props.total
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFetching !== this.state.isFetching;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isFetching) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  loadData = params => {
    this.setState({ isFetching: true });

    api.products(params).then(({ records, total }) => {
      this.setState({
        isFetching: false,
        data: records,
        total
      });
    });
  };

  handleChangePage = params => {
    this.loadData(params);
  };

  render() {
    const { isFetching, data, total } = this.state;

    return (
      <React.Fragment>
        <section className="product-list">
          {isFetching && (
            <React.Fragment>
              <div className="layout-position-fixed">
                <LinearProgress animType={2} />
              </div>
              <div className="loading-mask" />
            </React.Fragment>
          )}
          <ProductListItems data={data} />
          <div className="product-list__paginator">
            <Pagination totalItems={total} pageSize={24} onChange={this.handleChangePage} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ProductList;
