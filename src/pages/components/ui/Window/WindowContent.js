import React from "react";
import PropTypes from "prop-types";

class WindowContent extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const { children } = this.props;

        return <section className="modal-window__content">{children}</section>;
    }
}

export default WindowContent;
