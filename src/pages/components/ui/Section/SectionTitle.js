import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const SectionTitle = ({ children, className, ...props }) => (
    <h3 className={classNames("section__title", className)} {...props}>
        {children}
    </h3>
);

SectionTitle.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default SectionTitle;
