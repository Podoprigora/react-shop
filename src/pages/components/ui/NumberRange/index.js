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
    to: this.props.to
  };

  handleSubmit = ev => {
    const { onChange } = this.props;

    onChange(this.state);
  };

  handleToFieldChange = (ev, value) => {
    this.setState({ to: parseInt(value, 10) });
  };

  handleFromFieldChange = (ev, value) => {
    this.setState({ from: parseInt(value, 10) });
  };

  render() {
    const { from, to } = this.state;
    const { from: defaultFrom, to: defaultTo } = this.props;

    return (
      <form
        style={{ padding: "0 10px 10px" }}
        onSubmit={ev => {
          ev.preventDefault();
        }}
      >
        <FieldContainer layout="hbox">
          <NumberField
            name="min_price"
            label="from"
            labelAlign="top"
            min={defaultFrom}
            max={to - 1}
            value={from}
            onBlur={this.handleFromFieldChange}
          />
          <NumberField
            name="min_price"
            label="to"
            labelAlign="top"
            style={{ marginLeft: "10px" }}
            min={from + 1}
            max={defaultTo}
            value={to}
            onBlur={this.handleToFieldChange}
          />
          <Button primary style={{ marginLeft: "10px" }} onClick={this.handleSubmit}>
            OK
          </Button>
        </FieldContainer>
      </form>
    );
  }
}

export default NumberRange;
