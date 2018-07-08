import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format as moneyFormat } from "money-formatter";

import Gallery from "../components/ui/Gallery";
import ProductShowcaseAside from "./ProductShowcaseAside";

import productData from "../../../data/product-view";

class ProductViewPage extends React.Component {
  state = {};

  render() {
    return (
      <div className="product-view">
        <div className="product-view-showcase">
          <Gallery images={productData.images} className="product-showcase__gallery" />
          <ProductShowcaseAside {...productData} />
        </div>
        <div className="product-view-other" style={{ height: "300px", padding: "25px" }}>
          Features and comments
        </div>
      </div>
    );
  }
}

export default ProductViewPage;
