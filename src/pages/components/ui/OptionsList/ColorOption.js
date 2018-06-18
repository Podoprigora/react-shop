import React from "react";
import PropTypes from "prop-types";
import OptionItem from "./OptionItem";
import Tooltip from "../Popover/Tooltip";

const ColorOption = props => (
  <OptionItem
    {...props}
    className="color-option"
    renderChildren={children => (
      <Tooltip title={children} position="top" delay={166}>
        <div className={`color-value-item color-${children.toLowerCase()}`} />
      </Tooltip>
    )}
  />
);

ColorOption.propTypes = {
  children: PropTypes.node.isRequired
};

export default ColorOption;
