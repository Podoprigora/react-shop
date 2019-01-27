import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const GalleryNextButton = ({ disabled, onClick = x => x }) => (
    <button
        className={classNames("gallery__nav-item nav-item-next", { "nav-item--disabled": disabled })}
        onClick={onClick}
    />
);

GalleryNextButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default GalleryNextButton;
