import React from "react";
import PropTypes from "prop-types";

import createFieldUI from "./createFieldUI";

const TextareaField = React.forwardRef((props, ref) => <textarea {...props} ref={ref} />);

TextareaField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string
};

export default createFieldUI(TextareaField);
