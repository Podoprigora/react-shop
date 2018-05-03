import React from "react";
import PropTypes from "prop-types";

import OptionItem from "./OptionItem";

const SINGLE_MODE = "single";
const MULTI_MODE = "multi";

class OptionsList extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    selMode: PropTypes.oneOf([SINGLE_MODE, MULTI_MODE]),
    size: PropTypes.number,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    selMode: SINGLE_MODE,
    onSelect: () => {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children, selMode, selected, size } = nextProps;
    let selection = {};
    let selectedValue = selected;

    React.Children.forEach(children, (child, index) => {
      if (selMode === SINGLE_MODE && Object.keys(selection).length > 0) {
        return;
      }
      if (Array.isArray(selected) && selected.length) {
        selectedValue = selected.find(s => child.props.value && s === child.props.value);
      }
      if (child.props.value && child.props.value === selectedValue) {
        selection = { ...selection, [index]: { index, value: child.props.value, text: child.props.children } };
      }
    });
    return { selection, collapsed: size > 0 && React.Children.count(children) > size };
  }

  state = {
    selection: {}
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { children: nextChildren } = nextProps;
    const { children } = this.props;
    const { selection: nextSelection } = nextState;
    const { selection } = this.state;
    const { selMode } = this.props;

    return (
      React.Children.count(nextChildren) !== React.Children.count(children) ||
      (selMode === SINGLE_MODE && Object.keys(nextSelection)[0] !== Object.keys(selection)[0]) ||
      (selMode === MULTI_MODE && Object.keys(nextSelection).length !== Object.keys(selection).length) ||
      nextState.collapsed !== this.state.collapsed
    );
  }

  handleItemSelect = (index, value, text, selected) => {
    const { selMode } = this.props;

    if (selMode === MULTI_MODE) {
      this.setState(prevState => {
        let selection;

        if (selected) {
          selection = Object.keys(prevState.selection).reduce((result, key) => {
            if (parseInt(key, 10) !== index) {
              return { ...result, [key]: prevState.selection[key] };
            }
            return result;
          }, {});
        } else {
          selection = { ...prevState.selection, [index]: { index, value, text } };
        }

        this.props.onSelect(Object.values(selection));

        return { selection };
      });
    } else if (selMode === SINGLE_MODE && !selected) {
      const selection = { [index]: { index, value, text } };

      this.setState(
        {
          selection
        },
        () => this.props.onSelect(Object.values(selection))
      );
    }
  };

  toggleCollapsed = ev => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { children, size, onSelect } = this.props;
    const { selection, collapsed } = this.state;

    return (
      <ul className="options-list">
        {React.Children.map(
          children,
          (child, index) =>
            (!collapsed || index < size) &&
            React.cloneElement(child, {
              index,
              onClick: this.handleItemSelect,
              selected: !!selection[index]
            })
        )}
        {size < React.Children.count(children) && (
          <OptionItem iconCls={collapsed ? "icon-expand_more" : "icon-expand_less"} onClick={this.toggleCollapsed}>
            {collapsed ? "Show more" : "Show less"}
          </OptionItem>
        )}
      </ul>
    );
  }
}

export default OptionsList;
export OptionItem from "./OptionItem";
export RadioOption from "./RadioOption";
export CheckboxOption from "./CheckboxOption";
