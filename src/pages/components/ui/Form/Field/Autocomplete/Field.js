import React from "react";
import PropTypes from "prop-types";
import InputField from "../InputField";

class Field extends React.Component {
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

  handleChange = ev => {
    const value = ev.target.value;

    this.props.onChange(value.trim());
  };

  render() {
    const { inputRef, value, onChange, onTriggerClick, ...inputProps } = this.props;

    return (
      <React.Fragment>
        <InputField {...inputProps} value={value} onChange={this.handleChange} inputRef={inputRef} />
        <button className="field-trigger icon icon-search" onClick={ev => onTriggerClick(ev, value)} />
      </React.Fragment>
    );
  }
}

export default Field;
