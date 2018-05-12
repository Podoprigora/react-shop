import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import InputField from "./InputField";

class NumberField extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  };
  static defaultProps = {
    onChange: () => {},
    onBlur: () => {}
  };

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    return { value };
  }

  state = {
    value: null
  };

  handleChange = ev => {
    const { onChange } = this.props;
    const { value } = ev.target;

    if (/^[-/./0-9]*$/g.test(value)) {
      this.setState({ value });
      onChange(ev, value);
    }
  };

  handleBlur = ev => {
    const { value } = this.state;
    const { min, max, defaultValue, onChange, onBlur } = this.props;

    if (min && value && value < min) {
      this.setState({ value: min });
      onChange(ev, min);
    } else if (max && value && value > max) {
      this.setState({ value: max });
      onChange(ev, max);
    } else {
      onChange(ev, value || defaultValue);
    }

    onBlur(ev);
  };

  handleKeyDown = ev => {
    const { keyCode } = ev;
    const { min, max, onChange } = this.props;

    switch (keyCode) {
      // Arrow Up
      case 38:
        this.setState(prevState => {
          const newValue = Math.min(prevState.value + 1, max);

          onChange(ev, newValue);

          return {
            value: newValue
          };
        });

        break;
      // Arrow Down
      case 40:
        this.setState(prevState => {
          const newValue = Math.max(prevState.value - 1, min);

          onChange(ev, newValue);

          return {
            value: newValue
          };
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { value } = this.state;
    const { ...props } = this.props;
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
