import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import InputField from "./InputField";

class NumberField extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  };

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    return { value };
  }

  state = {
    value: ""
  };

  handleChange = ev => {
    const { value } = ev.target;

    if (/^[-/./0-9]*$/g.test(value)) {
      this.setState({ value });
    }
  };

  handleBlur = ev => {
    const { value } = this.state;
    const { min, max } = this.props;

    if (min && value && value < min) {
      this.setState({ value: min });
    } else if (max && value && value > max) {
      this.setState({ value: max });
    }
  };

  render() {
    const { value } = this.state;
    const { ...props } = this.props;

    return <InputField {...props} value={value} onChange={this.handleChange} onBlur={this.handleBlur} />;
  }
}

export default NumberField;
