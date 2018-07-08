import React from "react";
import PropTypes from "prop-types";

class GalleryImage extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };
  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  render() {
    const { src, onMouseEnter, onMouseLeave } = this.props;

    return (
      <div className="gallery__item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={src} alt="" />
      </div>
    );
  }
}

export default GalleryImage;
