import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const createFieldUI = InputComponent =>
  class extends React.PureComponent {
    static propTypes = {
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      labelAlign: PropTypes.oneOf(["top", "left"]),
      style: PropTypes.object
    };

    render() {
      const { label, labelAlign, style, ...inputProps } = this.props;
      const { name } = inputProps;

      return (
        <div className={classNames("field", { "field-label-align-top": labelAlign === "top" })} style={style}>
          {label && (
            <label htmlFor={name} className="field__label">
              {label}
            </label>
          )}
          <div className="field__wrap">
            <div className="field__wrap-input">
              <InputComponent {...inputProps} className="field__input" />
              <div className="input-underline" />
            </div>
          </div>
        </div>
      );
    }
  };

export default createFieldUI;
