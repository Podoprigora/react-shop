import React from "react";
import PropTypes from "prop-types";

const Header = params => (
  <div className="main__header">
    <div className="resp-content">
      <a href="/" className="logo">
        <span>React Shop</span>
      </a>
    </div>
  </div>
);

Header.propTypes = {};

export default Header;
