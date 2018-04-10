import React from "react";

import ProductFilters from "./Filters";
import ProductList from "./List";

import TopsellerCarousel from "../MainPage/TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

class ProductsPage extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <div className="layout-hbox">
          <ProductFilters />
          <ProductList />
        </div>
        <TopsellerCarousel data={topsellerData} />
      </div>
    );
  }
}

export default ProductsPage;
