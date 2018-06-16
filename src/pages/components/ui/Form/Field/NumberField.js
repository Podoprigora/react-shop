import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import InputField from "./InputField";

class NumberField extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  };
  static defaultProps = {
    onChange: () => {},
    onBlur: () => {}
  };

  handleChange = ev => {
    const { onChange } = this.props;
    const { value } = ev.target;

    if (/^[-/./0-9]*$/g.test(value)) {
      onChange(ev, value);
    }
  };

  handleBlur = ev => {
    const { min, max, value, defaultValue, onChange, onBlur } = this.props;

    if (min && value && value < min) {
      onChange(ev, min);
    } else if (max && value && value > max) {
      onChange(ev, max);
    } else {
      onChange(ev, value || defaultValue);
    }

    onBlur(ev);
  };

  handleKeyDown = ev => {
    const { keyCode } = ev;
    const { value, min, max, onChange } = this.props;
    let newValue = value || 0;

    switch (keyCode) {
      // Arrow Up
      case 38:
        newValue = newValue ? Math.min(newValue + 1, max) : min;
        onChange(ev, newValue);
        break;
      // Arrow Down
      case 40:
        newValue = newValue ? Math.max(newValue - 1, min) : max;
        onChange(ev, newValue);
        break;
      default:
        break;
    }
  };

  render() {
    const { value, ...props } = this.props;
    return (
      <InputField
        {...props}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default NumberField;
