import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const createFieldUI = InputComponent => {
    class CreateFieldUI extends React.Component {
        static propTypes = {
            name: PropTypes.string,
            label: PropTypes.string,
            labelAlign: PropTypes.oneOf(["top", "left"]),
            style: PropTypes.object,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            forwardedRef: PropTypes.object
        };
        static defaultProps = {
            onBlur: () => {},
            onFocus: () => {}
        };

        state = {
            isFocused: false
        };

        handleInputFocus = ev => {
            this.setState({ isFocused: true });
            this.props.onFocus(ev);
        };

        handleInputBlur = ev => {
            this.setState({ isFocused: false });
            this.props.onBlur(ev);
        };

        render() {
            const { forwardedRef, label, labelAlign, style, ...inputProps } = this.props;
            const { name } = inputProps;
            const { isFocused } = this.state;

            return (
                <div
                    className={classNames("field", {
                        "field-label-align-top": labelAlign === "top",
                        "field--focused": isFocused
                    })}
                    style={style}
                >
                    {label && (
                        <label htmlFor={name} className="field__label">
                            {label}
                        </label>
                    )}
                    <div className="field__wrap">
                        <div className="field__wrap-input">
                            <InputComponent
                                {...inputProps}
                                className="field__input"
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputBlur}
                                ref={forwardedRef}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

    return React.forwardRef((props, ref) => <CreateFieldUI {...props} forwardedRef={ref} />);
};

export default createFieldUI;
