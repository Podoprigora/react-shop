import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import debounce from "lodash/debounce";
import isMobile from "ismobilejs";
import Portal from "../utils/Portal";

class Tooltip extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        position: PropTypes.string,
        delay: PropTypes.number,
        disableTouchListener: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        position: "bottom",
        delay: 300,
        disableTouchListener: true
    };

    state = {
        isOpened: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isOpened !== nextState.isOpened;
    }

    enterTimer = null;
    ignoreTouchEvent = false;

    toggleOpen(open) {
        this.setState({ isOpened: open });
    }

    handleMouseEnter = ev => {
        const { delay } = this.props;

        if (!isMobile.any) {
            clearInterval(this.enterTimer);
            this.enterTimer = setTimeout(() => this.toggleOpen(true), delay);
        }
    };

    handleMouseLeave = ev => {
        clearInterval(this.enterTimer);
        this.toggleOpen(false);
    };

    handleTouchStart = ev => {
        const { delay, disableTouchListener } = this.props;
        const { isOpened } = this.state;

        if (!disableTouchListener) {
            clearInterval(this.enterTimer);
            this.enterTimer = setTimeout(() => this.toggleOpen(!isOpened), delay);
        }
    };

    render() {
        const { isOpened } = this.state;
        const { children, title, position, disableTouchListener, className, style: mainStyle } = this.props;

        return (
            <Manager>
                <Reference>
                    {({ ref }) =>
                        React.cloneElement(children, {
                            ref,
                            onMouseEnter: this.handleMouseEnter,
                            onMouseLeave: this.handleMouseLeave,
                            onTouchStart: this.handleTouchStart
                        })
                    }
                </Reference>
                <Portal>
                    <TransitionGroup component={null}>
                        {isOpened && (
                            <CSSTransition classNames="anim-tooltip" timeout={300}>
                                <Popper placement={position}>
                                    {({ ref, style, placement }) => (
                                        <div
                                            ref={ref}
                                            style={{ ...style, ...mainStyle }}
                                            data-placement={placement}
                                            className={classNames("tooltip", className)}
                                        >
                                            <div
                                                className={classNames(
                                                    "tooltip__content",
                                                    `tooltip-position-${position}`
                                                )}
                                            >
                                                {title}
                                            </div>
                                        </div>
                                    )}
                                </Popper>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </Portal>
            </Manager>
        );
    }
}

export default Tooltip;
