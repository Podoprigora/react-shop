import React from "react";
import PropTypes from "prop-types";
import OptionItem from "./OptionItem";

const ColorOption = props => (
  <OptionItem
    {...props}
    className="color-option"
    renderChildren={children => <div className={`color-value-item color-${children.toLowerCase()}`} />}
  />
);

ColorOption.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string
};

export default ColorOption;
