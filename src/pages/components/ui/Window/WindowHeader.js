import React from "react";
import PropTypes from "prop-types";

class WindowHeader extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        align: PropTypes.string
    };

    render() {
        const { children, align } = this.props;

        return (
            <header className="modal-window__header" style={{ textAlign: align }}>
                <h2>{children}</h2>
            </header>
        );
    }
}

export default WindowHeader;
