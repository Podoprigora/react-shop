import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SectionTitle from "./SectionTitle";

const SectionHeader = ({ children, title, className, ...props }) => (
    <header className={classNames("section__header", className)} {...props}>
        {title && <SectionTitle>{title}</SectionTitle>}
        {children}
    </header>
);

SectionHeader.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};

export default SectionHeader;
