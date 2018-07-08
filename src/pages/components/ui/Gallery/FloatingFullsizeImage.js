import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class GalleryFloatingFullsizeImage extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    show: PropTypes.bool
  };
  static defaultProps = {
    show: false
  };

  state = {
    posX: 0,
    posY: 0
  };

  componentDidMount() {
    this.wrapRef.current.addEventListener("touchmove", this.handleImageMove, false);
  }

  componentWillUnmount() {
    this.wrapRef.current.removeEventListener("touchmove", this.handleImageMove, false);
  }

  wrapRef = React.createRef();

  handleImageMove = ev => {
    ev.preventDefault();

    const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;
    const {
      left: wrapX,
      top: wrapY,
      width: wrapWidth,
      height: wrapHeight
    } = this.wrapRef.current.getBoundingClientRect();

    const deltaX = (ev.target.clientWidth - wrapWidth) / wrapWidth;
    const deltaY = (ev.target.clientHeight - wrapHeight) / wrapHeight;

    const posX = (clientX - wrapX) * deltaX;
    const posY = (clientY - wrapY) * deltaY;

    this.setState({ posX, posY });
  };

  render() {
    const { src, show } = this.props;
    const { posX, posY } = this.state;

    return (
      <div
        className={classNames("gallery__fullsize", { "gallery__fullsize--active": show })}
        ref={this.wrapRef}
        onMouseMove={this.handleImageMove}
      >
        <img src={src} alt="" style={{ top: -posY, left: -posX }} />
      </div>
    );
  }
}

export default GalleryFloatingFullsizeImage;
