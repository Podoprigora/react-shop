import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const StarRating = ({ selected, total }) => {
    const stars = [...Array(total)];
    const markedSelected = Math.ceil(selected);
    const fullSelected = Math.floor(selected);
    const halfSelected = selected > fullSelected ? markedSelected : 0;

    return (
        <ul className="star-rating">
            {stars.map((item, i) => (
                <li key={i} className="star-rating-item">
                    <div
                        className={classNames("icon", {
                            "icon-star": i + 1 !== halfSelected,
                            "icon-star_half": i + 1 === halfSelected,
                            "star--selected": markedSelected >= i + 1,
                            "star--empty": i + 1 > markedSelected
                        })}
                    />
                </li>
            ))}
        </ul>
    );
};

StarRating.propTypes = {
    selected: PropTypes.number,
    total: PropTypes.number
};

StarRating.defaultProps = {
    total: 5
};

export default StarRating;
