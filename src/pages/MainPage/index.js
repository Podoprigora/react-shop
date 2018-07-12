import React from "react";
import PropTypes from "prop-types";

import BrandsCarousel from "./BrandsCarousel";
import brandsData from "../../../data/brands";

import BrandnewCarousel from "./BrandnewCarousel";
import brandnewData from "../../../data/brandnew-products";

import TopsellerCarousel from "./TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const MainPage = ({ history }) => {
  const handleItemClick = ({ id }) => {
    history.push(`/product/${id}`);
  };

  return (
    <div>
      <BrandsCarousel data={brandsData} />
      <BrandnewCarousel data={brandnewData} total={45} onItemClick={handleItemClick} />
      <TopsellerCarousel data={topsellerData} total={45} onItemClick={handleItemClick} />
    </div>
  );
};

MainPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default MainPage;
