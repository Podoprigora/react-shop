import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class SimpleList extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    };

    render() {
        const { children, className, ...props } = this.props;

        if (React.Children.count(children) === 0) {
            return null;
        }

        return (
            <ul className={classNames(className)} {...props}>
                {children}
            </ul>
        );
    }
}

export default SimpleList;
