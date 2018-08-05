import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import DocumentScroll from "../components/ui/DocumentScroll";

import ProductFilters from "./Filters";
import ProductList from "./List";
import productsData from "../../../data/products";

import TopsellerCarousel from "../MainPage/TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const ProductsPage = ({ history }) => {
  const handleItemClick = ({ id }) => {
    history.push(`/product/${id}`);
  };

  return (
    <React.Fragment>
      <DocumentScroll>
        {({ isEnter, top, bottom, height }) => {
          let stickyStyle = { position: "relative", height: "100%" };

          if (bottom > 200) {
            if (top <= 0) {
              stickyStyle = { ...stickyStyle, position: "fixed", top: 0, bottom: 0, width: "240px" };
            }

            if (bottom < document.documentElement.clientHeight) {
              stickyStyle = { ...stickyStyle, height: bottom };
            }
          }

          return (
            <div className="products-container">
              <div className="products-container__aside">
                <div style={stickyStyle}>
                  <Scrollbars>
                    <ProductFilters />
                  </Scrollbars>
                </div>
              </div>
              <ProductList data={productsData} total={364} onItemClick={handleItemClick} />
            </div>
          );
        }}
      </DocumentScroll>
      <TopsellerCarousel data={topsellerData} total={45} pageSize={15} onItemClick={handleItemClick} />
    </React.Fragment>
  );
};

ProductsPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default ProductsPage;
