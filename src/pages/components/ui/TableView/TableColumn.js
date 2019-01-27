import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TableColumn extends React.PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        record: PropTypes.object,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        flex: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string
    };

    render() {
        const { children, record, width, flex, className, style } = this.props;

        return (
            <div
                className={classNames("table-view__col", className)}
                style={{ width: `${width}px`, flex, ...style }}
            >
                {children(record)}
            </div>
        );
    }
}

export default TableColumn;
