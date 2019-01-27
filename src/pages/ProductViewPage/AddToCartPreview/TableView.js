import React from "react";
import PropTypes from "prop-types";
import { format as moneyFormat } from "money-formatter";

import { productType } from "../../components/types";
import TableView, { TableColumn } from "../../components/ui/TableView";

class AddToCartPreviewTableView extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape(productType)).isRequired
    };

    render() {
        const { data } = this.props;

        return (
            <TableView data={data}>
                <TableColumn width="160">
                    {({ picture, name, id }) => (
                        <div className="product-img" style={{ width: "120px" }}>
                            <img src={picture} alt={name} />
                        </div>
                    )}
                </TableColumn>
                <TableColumn flex="1">
                    {({ name, brand, color, size }) => (
                        <React.Fragment>
                            <div className="product-title">{`${brand} ${name}`}</div>
                            <div className="product-feature">
                                <span>Color:</span> {color}
                            </div>
                            <div className="product-feature">
                                <span>Size:</span> {size}
                            </div>
                        </React.Fragment>
                    )}
                </TableColumn>
                <TableColumn width="120">
                    {({ price, oldPrice, specialPrice, currency }) =>
                        specialPrice ? (
                            <div className="product-prices">
                                <div className="product-price product-price--old">
                                    {moneyFormat(currency, oldPrice)}
                                </div>
                                <div className="product-price product-price--special">
                                    {moneyFormat(currency, specialPrice)}
                                </div>
                            </div>
                        ) : (
                            <div className="product-price">{moneyFormat(currency, price)}</div>
                        )
                    }
                </TableColumn>
            </TableView>
        );
    }
}

export default AddToCartPreviewTableView;
