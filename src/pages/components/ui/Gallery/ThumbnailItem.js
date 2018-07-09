import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class GalleryThumbnailItem extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };
  static defaultProps = {
    selected: false,
    onClick: () => {}
  };

  shouldComponentUpdate(nextProps) {
    return this.props.selected !== nextProps.selected;
  }

  render() {
    const { src, selected, onClick } = this.props;

    return (
      <a
        role="presentation"
        className={classNames("thumbnail-item", {
          "thumbnail-item--selected": selected
        })}
        onClick={onClick}
      >
        <img src={src} alt="" />
      </a>
    );
  }
}

export default GalleryThumbnailItem;
