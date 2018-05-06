import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class OptionItem extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number,
    selected: PropTypes.bool,
    hidden: PropTypes.bool,
    className: PropTypes.string,
    iconCls: PropTypes.string,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
    renderChildren: PropTypes.func
  };

  render() {
    const { children, index, value, selected, className, iconCls, tooltip, onClick, renderChildren } = this.props;

    return (
      <li>
        <a
          className={classNames(
            "option-item",
            className,
            { "option-item--selected": selected, icon: iconCls },
            iconCls
          )}
          role="presentation"
          onClick={ev => onClick && onClick(index, value, children, selected)}
        >
          {renderChildren ? renderChildren(children, value, selected) : children}
        </a>
      </li>
    );
  }
}

export default OptionItem;
