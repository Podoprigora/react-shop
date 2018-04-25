import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const LinearProgress = ({ animType, height }) => (
  <div className="linear-progress" style={{ height }}>
    <div className={classNames("linear-progress__bar", `anim-type-${animType}`)} />
  </div>
);

LinearProgress.propTypes = {
  animType: PropTypes.number,
  height: PropTypes.number
};

LinearProgress.defaultProps = {
  animType: 1
};

export default LinearProgress;
