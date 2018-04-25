import React from "react";

import BrandsCarousel from "./BrandsCarousel";
import brandsData from "../../../data/brands";

import BrandnewCarousel from "./BrandnewCarousel";
import brandnewData from "../../../data/brandnew-products";

import TopsellerCarousel from "./TopsellerCarousel";
import topsellerData from "../../../data/topseller-products";

const MainPage = () => (
  <div>
    <BrandsCarousel data={brandsData} />
    <BrandnewCarousel data={brandnewData} total={45} />
    <TopsellerCarousel data={topsellerData} total={45} />
  </div>
);

export default MainPage;
