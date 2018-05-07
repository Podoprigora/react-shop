import React from "react";
import PropTypes from "prop-types";

import { NumberField, FieldContainer } from "../Form/Field";
import Button from "../Button";

class NumberRange extends React.PureComponent {
  static propTypes = {
    from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    from: this.props.from,
    prevFrom: null,
    to: this.props.to,
    prevTo: null
  };

  fromInputRef = React.createRef();

  handleSubmit1 = ev => {
    const { onChange } = this.props;
    const { from, to } = this.state;

    onChange({ from, to });
  };

  handleToFieldChange = (ev, value) => {
    this.setState(prevState => ({ to: value ? parseInt(value, 10) : prevState.prevTo }));
  };

  handleFromFieldChange = (ev, value) => {
    this.setState(prevState => ({ from: value ? parseInt(value, 10) : prevState.prevFrom }));
  };

  handleFromFieldFocus = ev => {
    this.setState(prevState => ({
      from: undefined,
      prevFrom: prevState.from
    }));
  };

  handleToFieldFocus = ev => {
    this.setState(prevState => ({
      to: undefined,
      prevTo: prevState.to
    }));
  };

  render() {
    const { from, prevFrom, to, prevTo } = this.state;
    const { from: defaultFrom, to: defaultTo } = this.props;

    return (
      <FieldContainer layout="hbox" style={{ padding: "0 10px 10px" }}>
        <NumberField
          name="min_price"
          label="from"
          labelAlign="top"
          min={defaultFrom}
          max={(to || prevTo) - 1}
          value={from}
          onFocus={this.handleFromFieldFocus}
          onBlur={this.handleFromFieldChange}
        />
        <NumberField
          name="min_price"
          label="to"
          labelAlign="top"
          style={{ marginLeft: "10px" }}
          min={(from || prevFrom) + 1}
          max={defaultTo}
          value={to}
          onFocus={this.handleToFieldFocus}
          onBlur={this.handleToFieldChange}
        />
        <Button primary style={{ marginLeft: "10px" }} onClick={this.handleSubmit1}>
          OK
        </Button>
      </FieldContainer>
    );
  }
}

export default NumberRange;
