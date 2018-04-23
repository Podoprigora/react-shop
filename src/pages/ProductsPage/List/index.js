import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";
import LinearProgress from "../../components/ui/LinearProgress";
import api from "../../../modules/api";

class ProductList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps };
  }

  state = {
    isFetching: false
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
                <LinearProgress />
              </div>
              <div className="loading-mask" />
            </React.Fragment>
          )}
          <ProductListItems data={data} />
          <div className="product-list__paginator">
            <Pagination pageSize={24} totalItems={total} onChange={this.handleChangePage} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ProductList;
