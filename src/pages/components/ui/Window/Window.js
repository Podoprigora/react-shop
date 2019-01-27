import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

const Window = ({ children, width, height, ...props }) => (
    <Modal {...props} className="modal-window" contentStyle={{ width: `${width}px`, height: `${height}px` }}>
        <React.Fragment>{children}</React.Fragment>
    </Modal>
);

Window.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string
};

export default Window;
