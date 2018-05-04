import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const OptionItem = ({ children, index, value, selected, hidden, className, iconCls, onClick, renderChildren }) => (
  <li>
    <a
      className={classNames(
        "option-item",
        className,
        { "option-item--selected": selected, "option-item--hidden": hidden, icon: iconCls },
        iconCls
      )}
      role="presentation"
      onClick={ev => onClick && onClick(index, value, children, selected)}
    >
      {renderChildren ? renderChildren(children, value, selected) : children}
    </a>
  </li>
);

OptionItem.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  selected: PropTypes.bool,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  iconCls: PropTypes.string,
  onClick: PropTypes.func,
  renderChildren: PropTypes.func
};

OptionItem.defaultProps = {
  hidden: false
};

export default OptionItem;
