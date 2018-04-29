import React from "react";
import PropTypes from "prop-types";

const SINGLE_MODE = "single";
const MULTI_MODE = "multi";

class Menu extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selMode: PropTypes.oneOf([SINGLE_MODE, MULTI_MODE]),
    onSelect: PropTypes.func
  };

  static defaultProps = {
    selModel: "single"
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let selection = {};

    React.Children.forEach(nextProps.children, (child, index) => {
      if (nextProps.selMode === SINGLE_MODE && Object.keys(selection).length > 0) {
        return;
      }
      if (child.props.selected) {
        selection = { ...selection, [index]: { index, value: child.props.value } };
      }
    });

    return {
      selection
    };
  }

  state = {
    selection: {}
  };

  handleItemSelect = (index, value, selected) => {
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
          selection = { ...prevState.selection, [index]: { index, value } };
        }

        this.props.onSelect(Object.values(selection));
        return { selection };
      });
    } else {
      const selection = { [index]: { index, value } };
      this.setState(
        {
          selection
        },
        () => this.props.onSelect(Object.values(selection))
      );
    }
  };

  render() {
    const { children, defaultValue, onSelect } = this.props;
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

export default Menu;
export MenuItem from "./Item";
