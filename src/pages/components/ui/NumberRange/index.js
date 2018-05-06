import React from "react";
import PropTypes from "prop-types";

import { NumberField, FieldContainer } from "../Form/Field";
import Button from "../Button";

class NumberRange extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  state = {};

  render() {
    return (
      <form
        style={{ padding: "0 10px 10px" }}
        onSubmit={ev => {
          ev.preventDefault();
        }}
      >
        <FieldContainer layout="hbox">
          <NumberField name="min_price" label="from" labelAlign="top" min={17} max={194} defaultValue={17} />
          <NumberField
            name="min_price"
            label="to"
            labelAlign="top"
            style={{ marginLeft: "10px" }}
            min={18}
            max={195}
            defaultValue={195}
            value={30}
          />
          <Button primary style={{ marginLeft: "10px" }}>
            OK
          </Button>
        </FieldContainer>
      </form>
    );
  }
}

export default NumberRange;
