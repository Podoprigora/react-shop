import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";
import LinearProgress from "../../components/ui/Progress/Linear";
import api from "../../../modules/api";

import Menu, { MenuItem } from "../../components/ui/Menu";

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

          <div className="dropdown dropdown--active tbar__item">
            <div className="dropdown__trigger">
              <button>Price down</button>
            </div>
            <div className="dropdown__items">
              <ul className="menu">
                <li>
                  <a className="menu-link" role="presentation">
                    Relevance
                  </a>
                </li>
                <li>
                  <a className="menu-link" role="presentation">
                    Price up
                  </a>
                </li>
                <li>
                  <a className="menu-link menu-link--selected" role="presentation">
                    Price down
                  </a>
                </li>
                <li>
                  <a className="menu-link" role="presentation">
                    Brandnew
                  </a>
                </li>
                <li>
                  <a className="menu-link" role="presentation">
                    Top Seller
                  </a>
                </li>
                <li>
                  <a className="menu-link" role="presentation">
                    Name
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Menu
              defaultValue="price-down"
              selMode="single"
              onSelect={selection => {
                console.log(selection);
              }}
            >
              <MenuItem value="relevance" selected>
                Relevance
              </MenuItem>
              <MenuItem value="prive-up">Price up</MenuItem>
              <MenuItem value="price-down">Price down</MenuItem>
              <MenuItem value="brandnew">Brandnew</MenuItem>
              <MenuItem value="top-seller">Top Seller</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Menu>
          </div>

          {/* <Dropdown placeholder="Sort By" onChange={value => {console.log(value)}}>

          </Dropdown> */}
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
