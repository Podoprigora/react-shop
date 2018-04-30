import React from "react";
import PropTypes from "prop-types";

const SINGLE_MODE = "single";
const MULTI_MODE = "multi";

class SelectItems extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    selMode: PropTypes.oneOf([SINGLE_MODE, MULTI_MODE]),
    onSelect: PropTypes.func
  };

  static defaultProps = {
    selModel: "single"
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children, selMode, selected } = nextProps;
    let selection = {};
    let selectedValue = selected;

    React.Children.forEach(children, (child, index) => {
      if (selMode === SINGLE_MODE && Object.keys(selection).length > 0) {
        return;
      }
      if (Array.isArray(selected) && selected.length) {
        selectedValue = selected.find(s => s === child.props.value);
      }
      if (child.props.value === selectedValue) {
        selection = { ...selection, [index]: { index, value: child.props.value, text: child.props.children } };
      }
    });
    return { selection };
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
      (selMode === MULTI_MODE && Object.keys(nextSelection).length !== Object.keys(selection).length)
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

  render() {
    const { children, onSelect } = this.props;
    const { selection } = this.state;

    return (
      <ul className="menu">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            index,
            onClick: this.handleItemSelect,
            selected: !!selection[index]
          })
        )}
      </ul>
    );
  }
}

export default SelectItems;
export SelectItem from "./Item";
export CheckboxSelectItem from "./CheckboxItem";
