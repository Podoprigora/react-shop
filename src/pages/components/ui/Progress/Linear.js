import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const LinearProgress = ({ animType, height, style }) => (
    <div className="linear-progress" style={{ height, ...style }}>
        <div className={classNames("linear-progress__bar", `anim-type-${animType}`)} />
    </div>
);

LinearProgress.propTypes = {
    animType: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object
};

LinearProgress.defaultProps = {
    animType: 1
};

export default LinearProgress;
