import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Portal extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onRendered: PropTypes.func
    };

    static defaultProps = {
        onRendered: () => {}
    };

    componentDidMount() {
        this.mountNode = document.body;
        this.forceUpdate(this.props.onRendered);
    }

    componentWillUnmount() {
        this.mountNode = null;
    }

    mountNode = null;

    render() {
        const { children } = this.props;
        return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
    }
}

export default Portal;
