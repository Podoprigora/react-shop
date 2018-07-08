import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class GalleryThumbnailList extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIdx: PropTypes.number,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    selectedIdx: 0
  };

  handleSelect = index => ev => {
    this.props.onSelect(index);
  };

  render() {
    const { images, selectedIdx } = this.props;

    return (
      <div className="gallery__thumbnails">
        <ul className="thumbnail-list">
          {images.map((image, i) => (
            <li key={i}>
              <a
                role="presentation"
                className={classNames("thumbnail-item", {
                  "thumbnail-item--selected": i === selectedIdx
                })}
                onClick={this.handleSelect(i)}
              >
                <img src={image} alt="" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GalleryThumbnailList;
