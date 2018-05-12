import React from "react";
import PropTypes from "prop-types";

const CircularProgress = ({ preset, size, strokeWidth }) => {
  const circleSize = 50;

  let containerSize = size;
  let circleStrokeWidth = strokeWidth;

  switch (preset) {
    case "small":
      containerSize = 24;
      circleStrokeWidth = 4;
      break;
    case "medium":
      containerSize = 36;
      circleStrokeWidth = 3;
      break;
    case "large":
      containerSize = 48;
      circleStrokeWidth = 2.2;
      break;
    default:
      containerSize = size;
      circleStrokeWidth = strokeWidth;
  }

  return (
    <div className="circular-progress" style={{ width: containerSize, height: containerSize }}>
      <svg viewBox={`0 0 ${circleSize} ${circleSize}`} className="circular-progress__svg">
        <circle
          className="circular-progress__circle"
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={circleSize / 2 - 5}
          strokeWidth={circleStrokeWidth}
        />
      </svg>
    </div>
  );
};

CircularProgress.propTypes = {
  preset: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number
};

CircularProgress.defaultProps = {
  preset: "medium",
  size: 36,
  strokeWidth: 3
};

export default CircularProgress;
