import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = params => (
  <div className="main__header">
    <div className="resp-content">
      <Link to="/">
        <span className="logo" />
      </Link>
      <div className="search-bar">
        <div className="input-wrap">
          <input type="text" placeholder="What are you looking for?" />
          <button className="icon icon-search" />
        </div>
      </div>
      <div className="buttons">
        <button className="icon icon-person_outline" />
        <button className="icon icon-favorite_border" />
        <button className="icon icon-shopping_basket" />
      </div>
    </div>
  </div>
);

Header.propTypes = {};

export default Header;
