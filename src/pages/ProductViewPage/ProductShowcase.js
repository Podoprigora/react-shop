import React from "react";
import PropTypes from "prop-types";
import { format as moneyFormat } from "money-formatter";
import classNames from "classnames";

import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import CircularProgress from "../components/ui/Progress/Circular";
import LinearProgress from "../components/ui/Progress/Linear";
import OptionsList, { OptionItem } from "../components/ui/OptionsList";
import AddToCartPreviewWindow from "./AddToCartPreview/Window";
import { productType } from "../components/types";

class ProductShowcase extends React.PureComponent {
    static propTypes = productType;

    state = {
        selectedSize: null,
        waitAddToCart: false,
        showAddToCartPreviewWindow: false,
        errors: {
            size: null
        }
    };

    handleSelectSize = ([{ value }]) => {
        this.setState(prevState => ({
            selectedSize: value,
            errors: { ...prevState.errors, size: null }
        }));
    };

    handleAddToCart = ev => {
        const { selectedSize } = this.state;

        if (!selectedSize) {
            this.setState(prevState => ({
                errors: { ...prevState.errors, size: true }
            }));
        } else {
            this.setState({ waitAddToCart: true });
            setTimeout(() => {
                this.setState({ waitAddToCart: false, showAddToCartPreviewWindow: true });
            }, 1600);
        }
    };

    handleCloseAddToCartPreviewWindow = ev => {
        this.setState({ showAddToCartPreviewWindow: false });
    };

    render() {
        const {
            showAddToCartPreviewWindow,
            waitAddToCart,
            selectedSize,
            errors: { size: sizeError }
        } = this.state;

        const { id, name, brand, sizes, specialPrice, oldPrice, price, currency } = this.props;

        return (
            <React.Fragment>
                <div className="product-showcase">
                    <header className="product-showcase__header">
                        <h3 className="product-showcase__brand">{brand}</h3>
                        <h4 className="product-showcase__name">{name}</h4>
                    </header>
                    <div className="product-showcase__prices">
                        <div className="product-price--old product-showcase__price--old">
                            {moneyFormat(currency, oldPrice)}
                        </div>
                        <div className="product-price--special product-showcase__price--special">
                            {moneyFormat(currency, specialPrice)}
                            <div className="product-flag product-flag--hot product-showcase__flag">
                                -{10}%
                            </div>
                        </div>
                        <div className="product-showcase__tax-details">
                            incl. VAT plus shipping costs
                        </div>
                    </div>
                    {sizes && (
                        <div className="product-showcase__sizes">
                            <label className="product-showcase__label">Sizes:</label>
                            <OptionsList
                                className="product-showcase__size-options"
                                selected={selectedSize}
                                onSelect={this.handleSelectSize}
                            >
                                {sizes.map((val, i) => (
                                    <OptionItem key={val} value={val} className="product-size__option">
                                        {val}
                                    </OptionItem>
                                ))}
                            </OptionsList>
                            {sizeError && (
                                <div className="field-error-message">Please choose a size.</div>
                            )}
                        </div>
                    )}
                    <Button
                        primary
                        loading={waitAddToCart}
                        icon="icon-add_shopping_cart"
                        iconSize="24"
                        className="product-showcase__button"
                        onClick={this.handleAddToCart}
                    >
                        Add to Cart
                    </Button>

                    <Button
                        icon="icon-favorite_border"
                        iconSize="24"
                        className="product-showcase__button"
                    >
                        Add to Wishlist
                    </Button>

                    <div className="product-showcase__delivery-details">
                        Delivery Time Is 4-6 Working Day(s)
                    </div>
                </div>
                <AddToCartPreviewWindow
                    open={showAddToCartPreviewWindow}
                    onClose={this.handleCloseAddToCartPreviewWindow}
                />
            </React.Fragment>
        );
    }
}

export default ProductShowcase;
