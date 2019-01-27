import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class SimpleListItem extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    };

    render() {
        const { children, className, ...props } = this.props;

        return (
            <li>
                <div className={classNames(className)} {...props}>
                    {children}
                </div>
            </li>
        );
    }
}

export default SimpleListItem;
