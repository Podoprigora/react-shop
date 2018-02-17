import React from "react";
import PropTypes from "prop-types";

import FeedCarousel from "../../components/FeedCarousel";
import { currencySymbol } from "../../components/helpers/render";

class BrandnewCarousel extends React.Component {
  renderItem = data => {
    const { name, brand, picture, price, oldPrice, specialPrice, currency } = data;
    let discount = null;
    if (oldPrice && oldPrice > 0 && specialPrice && specialPrice > 0) {
      discount = Math.round((oldPrice - specialPrice) / oldPrice * 100);
    }

    return (
      <div className="products-carousel__item">
        <div className="product-item__img">
          <img src={picture} alt={name} title={name} />
        </div>
        <h4>
          <div className="product-item__brand">{brand}</div>
          <div className="product-item__name">{name}</div>
        </h4>
        {price && (
          <div className="product-item__price product-price">
            {currencySymbol(currency)}
            {price}
          </div>
        )}
        {oldPrice &&
          specialPrice && (
            <div className="product-price-wrap">
              <div className="product-item__price product-price product-price--old">
                {currencySymbol(currency)}
                {oldPrice}
              </div>
              <div className="product-item__price product-price product-price--special">
                {currencySymbol(currency)}
                {specialPrice}
              </div>
            </div>
          )}
        {discount && (
          <div className="product-item__flag">
            <div className="product-flag product-flag--hot">-{discount}%</div>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="products-carousel carousel-container">
        <header className="carousel-container__header">
          <h3 className="carousel-container__title">Topseller</h3>
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
      price: PropTypes.number,
      oldPrice: PropTypes.number,
      specialPrice: PropTypes.number,
      currency: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BrandnewCarousel;
