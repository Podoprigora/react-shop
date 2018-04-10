import React from "react";

import { Layout, FlexPane, FixedWhenScrollPane } from "../components/ui/Layout";

import ProductFilters from "./Filters";
import ProductList from "./List";

import TopsellerCarousel from "../MainPage/TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const ProductsPage = props => (
  <div>
    <Layout type="hbox" enableProcessScrollEvent>
      <FixedWhenScrollPane className="products-filters-container">
        <ProductFilters />
      </FixedWhenScrollPane>
      <FlexPane className="products-list-container">
        <ProductList />
      </FlexPane>
    </Layout>
    <TopsellerCarousel data={topsellerData} />
  </div>
);

export default ProductsPage;
