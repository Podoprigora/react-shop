import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const createFieldUI = InputComponent =>
  class extends React.Component {
    static propTypes = {
      name: PropTypes.string,
      label: PropTypes.string,
      labelAlign: PropTypes.oneOf(["top", "left"]),
      style: PropTypes.object,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      onBlur: PropTypes.func,
      onFocus: PropTypes.func
    };
    static defaultProps = {
      onBlur: () => {},
      onFocus: () => {}
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
      focused: false,
      value: ""
    };

    handleInputFocus = ev => {
      this.setState({ focused: true });
      this.props.onFocus(ev);
    };

    handleInputBlur = ev => {
      const { defaultValue, onBlur } = this.props;
      const { value } = this.state;
      const newValue = !value && defaultValue ? defaultValue : value;

      this.setState({ focused: false, value: newValue });
      onBlur(ev, newValue);
    };

    render() {
      const { label, labelAlign, style, defaultValue, ...inputProps } = this.props;
      const { name } = inputProps;
      const { focused, value } = this.state;

      return (
        <div
          className={classNames("field", { "field-label-align-top": labelAlign === "top", "field--focused": focused })}
          style={style}
        >
          {label && (
            <label htmlFor={name} className="field__label">
              {label}
            </label>
          )}
          <div className="field__wrap">
            <div className="field__wrap-input">
              <InputComponent
                {...inputProps}
                value={value}
                className="field__input"
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            </div>
          </div>
        </div>
      );
    }
  };

export default createFieldUI;
