import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import TopNav from "./TopNav";

const MainLayout = props => {
  const { children } = props;

  return (
    <div className="main">
      <Header />
      <TopNav />
      <div className="main__content" />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
