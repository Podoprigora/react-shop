import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EventListener from "react-event-listener";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Trigger from "./Trigger";
import BoundingContent from "./BoundingContent";
import SelectItems from "../SelectItems";
import { DOMHasParent } from "../helpers/dom";

class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    displayText: PropTypes.string,
    className: PropTypes.string,
    iconCls: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value || "",
    displayText: this.props.displayText || "",
    isOpened: false
  };

  triggerRef = React.createRef();
  elRef = React.createRef();

  handleMenuSelect = selection => {
    const value = selection[0].value;
    const displayText = selection[0].text;

    this.setState({ value, displayText, isOpened: false });
  };

  handleTriggerClick = ev => {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened
    }));
  };

  handleDocumentClick = ev => {
    if (this.state.isOpened && !DOMHasParent(ev, this.elRef.current)) {
      this.setState({ isOpened: false });
    }
  };

  render() {
    const { children, className, iconCls, onChange } = this.props;
    const { value, displayText, isOpened } = this.state;

    return (
      <div className={classNames("dropdown", className, { "dropdown--active": isOpened })} ref={this.elRef}>
        <EventListener target="document" onClick={this.handleDocumentClick} />
        <Trigger text={displayText} iconCls={iconCls} onClick={this.handleTriggerClick} elRef={this.triggerRef} />
        <TransitionGroup>
          {isOpened && (
            <CSSTransition classNames="anim-scale-fade" timeout={150}>
              <BoundingContent ancestorEl={this.triggerRef.current}>
                <SelectItems selMode="single" selected={value} onSelect={this.handleMenuSelect}>
                  {children}
                </SelectItems>
              </BoundingContent>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Dropdown;
