import React from "react";
import PropTypes from "prop-types";

import FeedCarousel from "../../components/FeedCarousel";
import { currencySymbol } from "../../components/helpers/render";

class BrandnewCarousel extends React.Component {
  renderItem = data => {
    const { name, brand, picture, price, currency } = data;
    return (
      <div className="products-carousel__item">
        <div className="product-item__img">
          <img src={picture} alt={name} title={name} />
        </div>
        <h4>
          <div className="product-item__brand">{brand}</div>
          <div className="product-item__name">{name}</div>
        </h4>
        <div className="product-item__price">
          {currencySymbol(currency)}
          {price}
        </div>
        <div className="product-item__flag">
          <div className="product-flag--new">New</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="products-carousel carousel-container">
        <header className="carousel-container__header">
          <h3 className="carousel-container__title">Brandnew</h3>
          <a className="carousel-container__viewall">View all</a>
        </header>
        <FeedCarousel enableScrollSlider data={this.props.data} renderItem={this.renderItem} />
      </div>
    );
  }
}

BrandnewCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      picture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BrandnewCarousel;
