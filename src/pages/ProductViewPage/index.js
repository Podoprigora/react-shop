import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format as moneyFormat } from "money-formatter";

import DocumentScroll from "../components/ui/DocumentScroll";
import ProductShowcase from "./ProductShowcase";
import ProductCenterContent from "./ProductCenterContent";

import productData from "../../../data/product-view";

class ProductViewPage extends React.Component {
  stickyContainerRef = React.createRef();

  render() {
    return (
      <DocumentScroll>
        {({ top, bottom }) => {
          let stickyContainerStyle = {};

          if (this.stickyContainerRef.current) {
            const {
              width: containerWidth,
              height: containerHeight
            } = this.stickyContainerRef.current.getBoundingClientRect();

            if (top < 0 && containerHeight < bottom) {
              stickyContainerStyle = {
                position: "fixed",
                top: 0,
                width: containerWidth
              };
            }
          }

          return (
            <div className="product-view">
              <div className="product-view__center">
                <ProductCenterContent {...productData} />
              </div>

              <div className="product-view__aside">
                <div
                  ref={this.stickyContainerRef}
                  className="product-view__sticky-container"
                  style={stickyContainerStyle}
                >
                  <ProductShowcase {...productData} />
                </div>
              </div>
            </div>
          );
        }}
      </DocumentScroll>
    );
  }
}

export default ProductViewPage;
