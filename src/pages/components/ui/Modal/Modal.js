import React from "react";
import PropTypes from "prop-types";
import getScrollbarSize from "dom-helpers/util/scrollbarSize";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import Portal from "../utils/Portal";
import ModalManager from "./ModalManager";

const setBodyStyle = () => {
    const { style } = document.body;

    style.overflow = "hidden";
    style.paddingRight = `${getScrollbarSize()}px`;
};

const removeBodyStyle = () => {
    const { style } = document.body;

    style.overflow = "auto";
    style.paddingRight = "0";
};

class Modal extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        open: PropTypes.bool,
        manager: PropTypes.object,
        hideBackdrop: PropTypes.bool,
        className: PropTypes.string,
        contentStyle: PropTypes.object,
        onRendered: PropTypes.func,
        onClose: PropTypes.func
    };

    static defaultProps = {
        open: false,
        manager: new ModalManager(),
        hideBackdrop: false,
        onRendered: () => {},
        onClose: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            rendered: false
        };
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (!nextProps.open && nextState.rendered) {
            return {
                rendered: false
            };
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.rendered !== nextState.rendered) {
            this.isRunningAnimation = true;
        }

        return nextProps.open !== this.props.open || nextState.rendered !== this.state.rendered;
    }

    isRunningAnimation = false;
    modalRef = React.createRef();

    handleOpen() {
        this.setState(
            {
                rendered: true
            },
            () => {
                const doc = document.body;

                this.props.manager.add(this);
                doc.addEventListener("keydown", this.handleDocumentKeyDown);
                setBodyStyle();
            }
        );
    }

    handleClose() {
        this.setState(
            {
                rendered: false
            },
            () => {
                const doc = document.body;

                this.props.manager.remove(this);
                doc.removeEventListener("keydown", this.handleDocumentKeyDown);
            }
        );
    }

    handleBackdropClick = ev => {
        this.handleClose();
    };

    handleEnteredAnimation = () => {
        this.props.onRendered();
    };

    handleExitAnimation = () => {
        this.isRunningAnimation = true;
    };

    handleExitedAnimation = () => {
        this.isRunningAnimation = false;

        removeBodyStyle();
        this.forceUpdate(this.props.onClose());
    };

    handleDocumentKeyDown = ev => {
        const { keyCode } = ev;

        if (!this.props.manager.isTopModal(this)) {
            return;
        }

        if (keyCode === 27) {
            this.handleClose();
        }
    };

    handlePortalRendered = () => {
        this.handleOpen();
    };

    render() {
        const { children, open, hideBackdrop, className, contentStyle, onRendered } = this.props;
        const { rendered } = this.state;

        if (!open && !this.isRunningAnimation) {
            return null;
        }

        return (
            <Portal onRendered={this.handlePortalRendered}>
                <TransitionGroup component={null}>
                    {rendered ? (
                        <CSSTransition
                            classNames="anim-modal"
                            timeout={300}
                            onEntered={this.handleEnteredAnimation}
                            onExit={this.handleExitAnimation}
                            onExited={this.handleExitedAnimation}
                        >
                            <div className={classNames("modal", className)}>
                                {!hideBackdrop && (
                                    <div
                                        role="presentation"
                                        className="modal__backdrop"
                                        onClick={this.handleBackdropClick}
                                    />
                                )}
                                <div className="modal__content" style={{ ...contentStyle }}>
                                    {React.cloneElement(children)}
                                </div>
                            </div>
                        </CSSTransition>
                    ) : null}
                </TransitionGroup>
            </Portal>
        );
    }
}

export default Modal;
