import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";

const ProductList = ({ data }) => (
  <section className="product-list">
    <ProductListItems data={data} />
    <div className="product-list__paginator">
      <Pagination pageSize={24} totalItems={384} />
    </div>
  </section>
);

ProductList.propTypes = {
  data: PropTypes.array.isRequired
};

export default ProductList;
