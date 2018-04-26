import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "../../components/ui/Progress/Circular";

const ProductFilters = ({ className }) => (
  <aside className="product-filters">
    Filters<CircularProgress />
  </aside>
);

ProductFilters.propTypes = {
  className: PropTypes.string
};

export default ProductFilters;
