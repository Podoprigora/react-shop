import React from "react";
import PropTypes from "prop-types";

const OptionsContainer = props => {
    const { height, containerRef } = props;

    return (
        <div className="autocomplete__options-container" style={{ maxHeight: height }} ref={containerRef}>
            {React.Children.only(props.children)}
        </div>
    );
};

OptionsContainer.propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.string,
    containerRef: PropTypes.object
};

export default OptionsContainer;
