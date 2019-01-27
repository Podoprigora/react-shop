import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class CollapsibleItem extends React.PureComponent {
    static propTypes = {
        collapsed: PropTypes.bool,
        onClick: PropTypes.func
    };
    static defaultProps = {
        collapsed: true,
        onClick: () => {}
    };

    render() {
        const { collapsed, onClick } = this.props;

        return (
            <li>
                <a
                    className={classNames("option-item", "icon", {
                        "icon-expand_more": collapsed,
                        "icon-expand_less": !collapsed
                    })}
                    role="presentation"
                    onClick={onClick}
                >
                    {collapsed ? "Show more" : "Show less"}
                </a>
            </li>
        );
    }
}

export default CollapsibleItem;
