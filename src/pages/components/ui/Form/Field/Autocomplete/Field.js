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
    forwardedRef: PropTypes.object
  };

  handleChange = ev => {
    const value = ev.target.value;

    this.props.onChange(value.trim());
  };

  render() {
    const { forwardedRef, value, onChange, onTriggerClick, ...inputProps } = this.props;

    return (
      <React.Fragment>
        <InputField {...inputProps} value={value} onChange={this.handleChange} ref={forwardedRef} />
        <button className="field-trigger icon icon-search" onClick={ev => onTriggerClick(ev, value)} />
      </React.Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => <Field forwardedRef={ref} {...props} />);
