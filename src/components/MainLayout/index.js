import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import TopNav from "./TopNav";
import Footer from "./Footer";

import categoriesData from "../../../data/categories";

const MainLayout = props => {
  const { children } = props;

  return (
    <div className="main">
      <Header />
      <TopNav data={categoriesData} maxVisibleListItems={5} onSelect={path => console.log(path)} />
      <div className="main__content">
        <div className="resp-content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
