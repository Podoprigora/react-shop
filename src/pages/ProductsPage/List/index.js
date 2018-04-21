import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";

const ProductList = ({ data }) => (
  <section className="product-list">
    <ProductListItems data={data} />
  </section>
);

ProductList.propTypes = {
  data: PropTypes.array.isRequired
};

export default ProductList;
