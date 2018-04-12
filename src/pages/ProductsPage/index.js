import React from "react";

import DocumentScroll from "../components/ui/DocumentScroll";
import Layout from "../components/ui/Layout";

import ProductFilters from "./Filters";
import ProductList from "./List";

import TopsellerCarousel from "../MainPage/TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const ProductsPage = props => (
  <div>
    <DocumentScroll>
      {isEnter => (
        <Layout type="hbox">
          <Layout.Fixed freezed={isEnter} className="products-filters-container">
            <ProductFilters />
          </Layout.Fixed>
          <Layout.Flex className="products-list-container">
            <ProductList />
          </Layout.Flex>
        </Layout>
      )}
    </DocumentScroll>
    <TopsellerCarousel data={topsellerData} />
  </div>
);

export default ProductsPage;
