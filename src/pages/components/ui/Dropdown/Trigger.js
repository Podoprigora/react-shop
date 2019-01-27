import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const DropdownTrigger = ({ text, iconCls, elRef, onClick }) => (
    <div className="dropdown__trigger" ref={elRef}>
        <button className={classNames({ icon: iconCls }, iconCls)} onClick={onClick && onClick}>
            {text ? <span>{text}</span> : <div>&nbsp;</div>}
        </button>
    </div>
);

DropdownTrigger.propTypes = {
    text: PropTypes.string,
    elRef: PropTypes.object,
    iconCls: PropTypes.string,
    onClick: PropTypes.func
};

export default DropdownTrigger;
