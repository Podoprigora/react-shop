import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const IconButton = React.forwardRef(({ icon, disabled, children, onClick, ...props }, ref) => (
    <button
        {...props}
        className={classNames("icon-button", "icon", icon)}
        onClick={ev => !disabled && onClick(ev)}
        ref={ref}
    >
        {children}
    </button>
));

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
};

IconButton.defaultProps = {
    onClick: f => f
};

export default IconButton;
