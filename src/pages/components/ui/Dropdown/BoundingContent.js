import React from "react";
import PropTypes from "prop-types";

class BoundingContent extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        ancestorEl: PropTypes.object,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    static defaultProps = {
        width: 200
    };

    state = {
        styles: {
            top: null,
            right: null,
            bottom: null,
            left: null,
            transformOrigin: null
        }
    };

    componentDidMount(prevProps) {
        this.updateStyles();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextState.styles) !== JSON.stringify(this.state.styles);
    }

    updateStyles() {
        const elDomRect = this.elRef.current.getBoundingClientRect();
        const ancestorDomRect = this.props.ancestorEl.getBoundingClientRect();
        const { clientWidth, clientHeight } = document.documentElement;

        let left = null;
        let right = null;
        let bottom = null;
        let top = null;
        let transformOrigin = "";

        if (ancestorDomRect.bottom + ancestorDomRect.height + elDomRect.height > clientHeight) {
            bottom = ancestorDomRect.height;
            transformOrigin += "bottom";
        } else {
            top = ancestorDomRect.height;
            transformOrigin += "top";
        }

        if (ancestorDomRect.left + ancestorDomRect.width + elDomRect.width > clientWidth) {
            right = 0;
            transformOrigin += " right";
        } else {
            left = 0;
            transformOrigin += " left";
        }

        this.setState({ styles: { top, right, bottom, left, transformOrigin } });
    }

    elRef = React.createRef();

    render() {
        const { children, ancestorEl, width } = this.props;
        const { styles } = this.state;

        return (
            <div
                className="dropdown-bound-content"
                style={{ width: `${width}px`, ...styles }}
                ref={this.elRef}
            >
                {children}
            </div>
        );
    }
}

export default BoundingContent;
