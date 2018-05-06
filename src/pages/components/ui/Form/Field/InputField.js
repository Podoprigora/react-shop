import React from "react";
import PropTypes from "prop-types";

import createFieldUI from "./createFieldUI";

class InputField extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    inputRef: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    type: "text",
    value: "",
    onChange: () => {},
    onBlur: () => {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value && !prevState.value && nextProps.defaultValue) {
      return { value: nextProps.defaultValue };
    } else if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  state = {
    value: ""
  };

  handleBlur = ev => {
    const { value, defaultValue, onBlur } = this.props;

    if (!value && defaultValue) {
      this.setState({ value: defaultValue });
    }

    onBlur(ev);
  };

  render() {
    const { inputRef, value, defaultValue, ...props } = this.props;
    const { value: inputValue } = this.state;

    return <input {...props} value={inputValue} ref={inputRef} onBlur={this.handleBlur} />;
  }
}

export default createFieldUI(InputField);
