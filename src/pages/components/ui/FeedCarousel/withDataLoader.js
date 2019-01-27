import React from "react";
import PropTypes from "prop-types";

const withDataLoader = (WrappedComponent, asyncRequest) => {
    class DataLoader extends React.Component {
        static propTypes = {
            data: PropTypes.array,
            pageSize: PropTypes.number,
            total: PropTypes.number
        };

        static defaultProps = {
            data: [],
            pageSize: 15,
            total: 0
        };

        constructor(props) {
            super(props);

            this.state = {
                isFetching: false,
                data: props.data,
                currentPage: 1,
                pageSize: props.pageSize,
                total: props.total || props.data.length
            };

            this.handleScrollEnd = this.handleScrollEnd.bind(this);
        }

        handleScrollEnd = el => {
            const { currentPage, pageSize, total } = this.state;

            if (currentPage * pageSize < total) {
                this.setState({ isFetching: true });

                asyncRequest().then(({ records }) => {
                    this.setState(prevState => ({
                        isFetching: false,
                        currentPage: prevState.currentPage + 1,
                        data: [...prevState.data, ...records]
                    }));
                });
            }
        };

        render() {
            const { isFetching, data } = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    data={data}
                    onScrollEnd={this.handleScrollEnd}
                    showLoadingIndication={isFetching}
                />
            );
        }
    }
    return DataLoader;
};

export default withDataLoader;
