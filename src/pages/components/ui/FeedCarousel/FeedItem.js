import React from "react";
import PropTypes from "prop-types";

const FeedItem = ({ children, onItemClick }) => (
    <a className="feed-carousel__item" role="presentation" onClick={onItemClick}>
        {children}
    </a>
);

FeedItem.propTypes = {
    children: PropTypes.node.isRequired,
    onItemClick: PropTypes.func
};

export default FeedItem;
