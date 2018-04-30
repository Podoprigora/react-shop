import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";
import LinearProgress from "../../components/ui/Progress/Linear";
import api from "../../../modules/api";

import { SelectItem } from "../../components/ui/SelectItems";
import Dropdown from "../../components/ui/Dropdown";

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

  /* eslint-disable */
  render() {
    const { isFetching, data, total } = this.state;

    return (
      <section className="product-list">
        {isFetching && (
          <React.Fragment>
            <div className="layout-position-fixed">
              <LinearProgress />
            </div>
            <div className="loading-mask" />
          </React.Fragment>
        )}
        <div className="tbar product-list__tbar">
          <div className="tbar__space" />
          <Dropdown
            value="relevance"
            displayText="Relevance"
            iconCls="icon-swap_vert"
            className="tbar__item"
            onChange={value => {
              console.log(value);
            }}
          >
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="prive-up">Price up</SelectItem>
            <SelectItem value="price-down">Price down</SelectItem>
            <SelectItem value="brandnew">Brandnew</SelectItem>
            <SelectItem value="top-seller">Top Seller</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </Dropdown>
        </div>
        <ProductListItems data={data} />
        <div className="product-list__paginator">
          <Pagination totalItems={total} pageSize={24} onChange={this.handleChangePage} />
        </div>
      </section>
    );
  }
}

export default ProductList;
