import React from "react";
import PropTypes from "prop-types";

import "rc-slider/assets/index.css";
import { Range } from "rc-slider";

import { NumberField, FieldContainer } from "../Form/Field";
import Button from "../Button";

class NumberRange extends React.PureComponent {
  static propTypes = {
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    min: this.props.min,
    max: this.props.max
  };

  handleSubmit = ev => {
    const { onChange } = this.props;
    const { min, max } = this.state;

    onChange({ min, max });
  };

  handleMinFieldChange = (ev, value) => {
    const { max } = this.state;

    this.setState({ min: value ? parseInt(value, 10) : "" });
  };

  handleMaxFieldChange = (ev, value) => {
    const { min } = this.state;

    this.setState({ max: value ? parseInt(value, 10) : "" });
  };

  handleSliderChange = ([min, max]) => {
    if (min < max) {
      this.setState({ min, max });
    }
  };

  render() {
    const { min, max } = this.state;
    const { min: defaultMin, max: defaultMax } = this.props;

    return (
      <React.Fragment>
        <FieldContainer layout="hbox" style={{ padding: "0 10px 10px" }}>
          <NumberField
            name="min_price"
            label="from"
            labelAlign="top"
            min={defaultMin}
            max={max - 1}
            value={min}
            defaultValue={defaultMin}
            onChange={this.handleMinFieldChange}
          />
          <NumberField
            name="max_price"
            label="to"
            labelAlign="top"
            style={{ marginLeft: "10px" }}
            min={min + 1}
            max={defaultMax}
            value={max}
            defaultValue={defaultMax}
            onChange={this.handleMaxFieldChange}
          />
          <Button primary style={{ marginLeft: "10px" }} onClick={this.handleSubmit}>
            OK
          </Button>
        </FieldContainer>
        <div style={{ padding: "5px 15px 0" }}>
          <Range
            allowCross={false}
            min={defaultMin}
            max={defaultMax}
            value={[min || defaultMin, max || defaultMax]}
            onChange={this.handleSliderChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default NumberRange;
