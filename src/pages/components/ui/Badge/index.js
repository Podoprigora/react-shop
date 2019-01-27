import React from "react";
import PropTypes from "prop-types";

const Badge = ({ children, content, ...other }) => {
    const badge = (
        <span className="badge" {...other}>
            {content}
        </span>
    );

    if (!children) {
        return badge;
    }

    return (
        <div className="badge-wrap">
            {children}
            {badge}
        </div>
    );
};

Badge.propTypes = {
    content: PropTypes.node.isRequired,
    children: PropTypes.node
};

export default Badge;
