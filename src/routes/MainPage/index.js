import React from "react";

import BrandsCarousel from "./BrandsCarousel";
import brandsData from "../../../data/brands";

import BrandnewCarousel from "./BrandnewCarousel";
import brandnewData from "../../../data/brandnew-products";

const MainPage = () => (
  <div>
    <BrandsCarousel data={brandsData} />
    <BrandnewCarousel data={brandnewData} />
  </div>
);

export default MainPage;
