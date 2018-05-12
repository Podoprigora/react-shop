import React from "react";
import PropTypes from "prop-types";

import createFieldUI from "./createFieldUI";

const InputField = ({ inputRef, defaultValue, ...props }) => <input {...props} ref={inputRef} />;

InputField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  inputRef: PropTypes.object
};

InputField.defaultProps = {
  type: "text",
  value: ""
};

export default createFieldUI(InputField);
