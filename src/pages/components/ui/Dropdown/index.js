import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EventListener from "react-event-listener";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Trigger from "./Trigger";
import BoundingContent from "./BoundingContent";
import OptionsList from "../OptionsList";

class Dropdown extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    displayText: PropTypes.string,
    className: PropTypes.string,
    iconCls: PropTypes.string,
    listWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value || "",
    displayText: this.props.displayText || "",
    isOpened: false
  };

  triggerRef = React.createRef();
  elRef = React.createRef();

  handleOptionSelect = ([firstSelection]) => {
    const { value } = firstSelection;
    const { text: displayText } = firstSelection;

    this.setState({ value, displayText, isOpened: false });
  };

  handleTriggerClick = ev => {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened
    }));
  };

  handleDocumentClick = ev => {
    if (this.state.isOpened && !this.elRef.current.contains(ev.target)) {
      this.setState({ isOpened: false });
    }
  };

  render() {
    const { children, className, iconCls, listWidth, onChange } = this.props;
    const { value, displayText, isOpened } = this.state;

    return (
      <div className={classNames("dropdown", className, { "dropdown--active": isOpened })} ref={this.elRef}>
        <EventListener target="document" onClick={this.handleDocumentClick} />
        <Trigger text={displayText} iconCls={iconCls} onClick={this.handleTriggerClick} elRef={this.triggerRef} />
        <TransitionGroup component={null}>
          {isOpened && (
            <CSSTransition classNames="anim-scale-fade" timeout={150}>
              <BoundingContent ancestorEl={this.triggerRef.current} width={listWidth}>
                <OptionsList selMode="single" selected={value} onSelect={this.handleOptionSelect}>
                  {children}
                </OptionsList>
              </BoundingContent>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Dropdown;
