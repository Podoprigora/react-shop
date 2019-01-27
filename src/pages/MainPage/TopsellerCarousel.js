import React from "react";
import PropTypes from "prop-types";
import { format as moneyFormat } from "money-formatter";

import FeedCarousel, { withDataLoader } from "../components/ui/FeedCarousel";
import api from "../../modules/api";

class TopsellerCarousel extends React.PureComponent {
    static propTypes = {
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
        ).isRequired,
        onScrollEnd: PropTypes.func.isRequired,
        showLoadingIndication: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func
    };

    static defaultProps = {
        onItemClick: () => {}
    };

    renderItem = data => {
        const { name, brand, picture, price, oldPrice, specialPrice, currency } = data;
        let discount = null;
        if (oldPrice && oldPrice > 0 && specialPrice && specialPrice > 0) {
            discount = Math.round(((oldPrice - specialPrice) / oldPrice) * 100);
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
                {price && <div className="product-item__price product-price">{moneyFormat(currency, price)}</div>}
                {oldPrice &&
                    specialPrice && (
                        <div className="product-prices">
                            <div className="product-item__price product-price product-price--old">
                                {moneyFormat(currency, oldPrice)}
                            </div>
                            <div className="product-item__price product-price product-price--special">
                                {moneyFormat(currency, specialPrice)}
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
        const { data, showLoadingIndication, onScrollEnd, onItemClick } = this.props;

        return (
            <div className="products-carousel carousel-container">
                <header className="carousel-container__header">
                    <h3 className="carousel-container__title">Topseller</h3>
                    <a className="carousel-container__viewall">View all</a>
                </header>
                <FeedCarousel
                    enableScrollSlider
                    data={data}
                    renderItem={this.renderItem}
                    onScrollEnd={onScrollEnd}
                    showLoadingIndication={showLoadingIndication}
                    onItemClick={onItemClick}
                />
            </div>
        );
    }
}

export default withDataLoader(TopsellerCarousel, api.topseller);
