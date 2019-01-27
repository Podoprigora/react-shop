import React from "react";
import PropTypes from "prop-types";

import ProductListItems from "./Items";
import Pagination from "../../components/ui/Pagination";
import LinearProgress from "../../components/ui/Progress/Linear";
import api from "../../../modules/api";

import { RadioOption } from "../../components/ui/OptionsList";
import Dropdown from "../../components/ui/Dropdown";

class ProductList extends React.PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        onItemClick: PropTypes.func
    };

    static defaultProps = {
        onItemClick: () => {}
    };

    state = {
        isFetching: false,
        data: this.props.data,
        total: this.props.total
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isFetching) {
            window.scroll({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    loadData = params => {
        this.setState({ isFetching: true });

        api.products(params).then(({ records, total }) => {
            this.setState({
                isFetching: false,
                data: records,
                total
            });
        });
    };

    handleChangePage = params => {
        this.loadData(params);
    };

    handleItemClick = item => {
        this.props.onItemClick(item);
    };

    render() {
        const { isFetching, data, total, showAddToCartPreviewWindow } = this.state;

        return (
            <section className="product-list">
                {isFetching && (
                    <React.Fragment>
                        <div className="layout-position-fixed">
                            <LinearProgress />
                        </div>
                        <div className="loading-mask" />
                    </React.Fragment>
                )}
                <div className="tbar product-list__tbar">
                    <div className="tbar__space" />
                    <Dropdown
                        value="relevance"
                        displayText="Relevance"
                        iconCls="icon-sort"
                        className="tbar__item"
                        onChange={value => {
                            console.log(value);
                        }}
                    >
                        <RadioOption value="relevance">Relevance</RadioOption>
                        <RadioOption value="prive-up">Price up</RadioOption>
                        <RadioOption value="price-down">Price down</RadioOption>
                        <RadioOption value="brandnew">Brandnew</RadioOption>
                        <RadioOption value="top-seller">Top Seller</RadioOption>
                        <RadioOption value="name">Name</RadioOption>
                    </Dropdown>
                </div>
                <ProductListItems data={data} onItemClick={this.handleItemClick} />
                <div className="product-list__paginator">
                    <Pagination totalItems={total} pageSize={24} onChange={this.handleChangePage} />
                </div>
            </section>
        );
    }
}

export default ProductList;
