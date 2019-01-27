import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const GalleryPrevButton = ({ disabled, onClick = x => x }) => (
    <button
        className={classNames("gallery__nav-item nav-item-prev", { "nav-item--disabled": disabled })}
        onClick={onClick}
    />
);

GalleryPrevButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default GalleryPrevButton;
