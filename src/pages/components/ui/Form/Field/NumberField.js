import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import InputField from "./InputField";

class NumberField extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    const { min, max, onBlur } = this.props;

    if (min && value && value < min) {
      this.setState({ value: min });
      onBlur(ev, min);
    } else if (max && value && value > max) {
      this.setState({ value: max });
      onBlur(ev, max);
    } else {
      onBlur(ev, value);
    }
  };

  render() {
    const { value } = this.state;
    const { ...props } = this.props;
    return <InputField {...props} value={value} onChange={this.handleChange} onBlur={this.handleBlur} />;
  }
}

export default NumberField;
