import React from "react";
import classNames from "classnames";

import DocumentScroll from "../components/ui/DocumentScroll";
import Layout from "../components/ui/Layout";

import ProductFilters from "./Filters";
import ProductList from "./List";
import productsData from "../../../data/products";

import TopsellerCarousel from "../MainPage/TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const ProductsPage = props => (
  <React.Fragment>
    <DocumentScroll>
      {isEnter => (
        <Layout type="with-slidebar">
          <Layout.Slidebar freezed={isEnter}>
            <ProductFilters />
          </Layout.Slidebar>
          <Layout.Flex>
            <ProductList data={productsData} total={364} />
          </Layout.Flex>
        </Layout>
      )}
    </DocumentScroll>
    <TopsellerCarousel data={topsellerData} />
  </React.Fragment>
);

export default ProductsPage;
