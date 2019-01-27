import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import GalleryThumbnailItem from "./ThumbnailItem";

class GalleryThumbnailList extends React.PureComponent {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectedIdx: PropTypes.number,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        selectedIdx: 0
    };

    render() {
        const { images, selectedIdx, onSelect } = this.props;

        return (
            <div className="gallery__thumbnails">
                <ul className="thumbnail-list">
                    {images.map((image, i) => (
                        <li key={i}>
                            <GalleryThumbnailItem
                                src={image}
                                selected={i === selectedIdx}
                                onClick={ev => onSelect(i)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GalleryThumbnailList;
