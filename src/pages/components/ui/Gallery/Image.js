import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class GalleryImage extends React.PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        className: PropTypes.string
    };
    static defaultProps = {
        onMouseEnter: () => {},
        onMouseLeave: () => {}
    };

    render() {
        const { src, onMouseEnter, onMouseLeave, className } = this.props;

        return (
            <div
                className={classNames("gallery__item", className)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <img src={src} alt="" />
            </div>
        );
    }
}

export default GalleryImage;
