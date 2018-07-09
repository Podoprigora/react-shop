import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import debounce from "lodash/debounce";

import GalleryImage from "./Image";
import GalleryThumbnailList from "./ThumbnailList";
import GalleryFloatingFullsizeImage from "./FloatingFullsizeImage";
import GalleryPrevButton from "./PrevButton";
import GalleryNextButton from "./NextButton";

class Gallery extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string
  };

  state = {
    activeIdx: 0,
    showFullSize: false
  };

  handlePrevButtonClick = ev => {
    const { images } = this.props;

    this.setState(prevState => ({
      activeIdx: prevState.activeIdx > 0 ? prevState.activeIdx - 1 : images.length - 1
    }));
  };

  handleNextButtonClick = ev => {
    const { images } = this.props;

    this.setState(prevState => ({
      activeIdx: prevState.activeIdx < images.length - 1 ? prevState.activeIdx + 1 : 0
    }));
  };

  handleThumbnailSelect = index => {
    this.setState({ activeIdx: index });
  };

  handleShowFullSizeImage = ev => {
    this.setState({ showFullSize: true });
  };

  handleHideFullSizeImage = ev => {
    this.setState({ showFullSize: false });
  };

  render() {
    const { images, className } = this.props;
    const { activeIdx, showFullSize } = this.state;

    return (
      <div className={classNames("gallery", className)}>
        <div className="gallery__viewport" onMouseLeave={this.handleHideFullSizeImage}>
          <GalleryImage src={images[activeIdx]} onMouseEnter={this.handleShowFullSizeImage} />
          <GalleryFloatingFullsizeImage src={images[activeIdx]} show={showFullSize} />
          <nav className="gallery__nav" onMouseEnter={this.handleHideFullSizeImage}>
            <GalleryPrevButton onClick={this.handlePrevButtonClick} />
            <GalleryNextButton onClick={this.handleNextButtonClick} />
          </nav>
        </div>
        <GalleryThumbnailList images={images} selectedIdx={activeIdx} onSelect={this.handleThumbnailSelect} />
      </div>
    );
  }
}

export default Gallery;
