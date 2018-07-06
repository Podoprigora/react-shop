import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format as moneyFormat } from "money-formatter";

import ProductShowcaseAside from "./ProductShowcaseAside";

import productData from "../../../data/product-view";

class ProductViewPage extends React.Component {
  state = {};

  render() {
    return (
      <div className="product-view">
        <div className="product-view-showcase">
          <div className="product-showcase__gallery">
            <div style={{ width: "100%", height: "300px" }}>Show case</div>
          </div>
          <ProductShowcaseAside {...productData} />
        </div>
        <div className="product-view-other">Features and comments</div>
      </div>
    );
  }
}

export default ProductViewPage;
