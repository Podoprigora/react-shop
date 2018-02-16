import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ScrollControl = ({ direction, disabled, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames("feed-carousel__control", {
        "nav-next": direction === "next",
        "nav-prev": direction === "prev"
      })}
    />
  );

ScrollControl.propTypes = {
  direction: PropTypes.oneOf(["next", "prev"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ScrollControl.defaultProps = {
  disabled: false
};

export default ScrollControl;
