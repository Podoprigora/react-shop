import React from "react";
import PropTypes from "prop-types";

class InputField extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onTriggerClick: PropTypes.func,
    inputRef: PropTypes.object
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  state = {
    value: this.props.value || ""
  };

  handleChange = ev => {
    const value = ev.target.value;

    this.setState({ value });
    this.props.onChange(value.trim());
  };

  render() {
    const { inputRef, onChange, onTriggerClick, ...inputProps } = this.props;
    const { value } = this.state;

    return (
      <div className="field">
        <div className="field__wrap">
          <div className="field__wrap-input">
            <input
              className="field__input"
              style={{ paddingRight: "32px" }}
              type="text"
              {...inputProps}
              value={value}
              onChange={this.handleChange}
              ref={inputRef}
            />
            <button className="field__input-trigger icon icon-search" onClick={ev => onTriggerClick(ev, value)} />
            <div className="input-underline" />
          </div>
        </div>
      </div>
    );

    // return (
    //   <div className="input-wrap">
    //     <input type="text" {...inputProps} value={value} onChange={this.handleChange} ref={inputRef} />
    //     <button className="icon icon-search" onClick={ev => onTriggerClick(ev, value)} />
    //   </div>
    // );
  }
}

export default InputField;
