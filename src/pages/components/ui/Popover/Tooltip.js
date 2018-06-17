import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import debounce from "lodash/debounce";
import Portal from "../utils/Portal";

class Tooltip extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.string,
    delay: PropTypes.number
  };

  static defaultProps = {
    position: "bottom",
    delay: 160
  };

  state = {
    isOpened: false
  };

  enterTimer = null;
  ignoreTouchEvent = false;

  toggleOpen(open) {
    this.setState({ isOpened: open });
  }

  handleMouseEnter = ev => {
    const { delay } = this.props;

    if (this.ignoreTouchEvent) {
      return;
    }

    clearInterval(this.enterTimer);
    this.enterTimer = setTimeout(() => this.toggleOpen(true), delay);
  };

  handleMouseLeave = ev => {
    clearInterval(this.enterTimer);
    this.toggleOpen(false);
    this.ignoreTouchEvent = false;
  };

  handleTouchStart = ev => {
    this.ignoreTouchEvent = true;
  };

  render() {
    const { isOpened } = this.state;
    const { children, title, position } = this.props;

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
          <TransitionGroup>
            {isOpened && (
              <CSSTransition classNames="anim-tooltip" timeout={300}>
                <Popper placement={position}>
                  {({ ref, style, placement }) => (
                    <div ref={ref} style={style} data-placement={placement} className="tooltip">
                      <div className={classNames("tooltip__content", `tooltip-position-${position}`)}>{title}</div>
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
