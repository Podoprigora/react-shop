import React from "react";

import BrandsList from "./BrandsCarousel";
import brandsData from "../../../data/brands";

const MainPage = () => (
  <div>
    <BrandsList data={brandsData} />
  </div>
);

export default MainPage;
