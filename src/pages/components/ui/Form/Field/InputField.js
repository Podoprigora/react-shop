import React from "react";
import PropTypes from "prop-types";

import createFieldUI from "./createFieldUI";

const InputField = React.forwardRef(({ defaultValue, ...props }, ref) => <input {...props} ref={ref} />);

InputField.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string
};

InputField.defaultProps = {
    type: "text",
    value: ""
};

export default createFieldUI(InputField);
