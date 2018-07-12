import React from "react";
import PropTypes from "prop-types";
import { format as moneyFormat } from "money-formatter";

import FeedCarousel, { withDataLoader } from "../components/ui/FeedCarousel";

import api from "../../modules/api";

class BrandnewCarousel extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      })
    ).isRequired,
    showLoadingIndication: PropTypes.bool,
    onScrollEnd: PropTypes.func,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    onItemClick: () => {}
  };

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
        <div className="product-item__price product-price">{moneyFormat(currency, price)}</div>
        <div className="product-item__flag">
          <div className="product-flag product-flag--new">New</div>
        </div>
      </div>
    );
  };

  render() {
    const { data, showLoadingIndication, onScrollEnd, onItemClick } = this.props;

    return (
      <div className="products-carousel carousel-container">
        <header className="carousel-container__header">
          <h3 className="carousel-container__title">Brandnew</h3>
          <a className="carousel-container__viewall">View all</a>
        </header>
        <FeedCarousel
          enableScrollSlider
          data={data}
          renderItem={this.renderItem}
          showLoadingIndication={showLoadingIndication}
          onScrollEnd={onScrollEnd}
          onItemClick={onItemClick}
        />
      </div>
    );
  }
}

export default withDataLoader(BrandnewCarousel, api.brandnew);
