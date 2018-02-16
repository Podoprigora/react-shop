import React from "react";
import PropTypes from "prop-types";
import _debounce from "lodash/debounce";
import EventListener from "react-event-listener";
import ScrollbarSize from "react-scrollbar-size";
import { getNormalizedScrollLeft, detectScrollType } from "normalize-scroll-left";
import scroll from "scroll";

import ScrollControl from "./ScrollControl";
import ScrollSlider from ".//ScrollSlider";
import FeedItem from "./FeedItem";

class FeedCarousel extends React.Component {
  state = {
    scrollerStyle: {
      marginBottom: 0
    },
    scrollSlider: {
      sliderWidth: 60,
      xPrecision: 0
    },
    disabledNavPrev: false,
    disabledNavNext: false
  };

  componentDidMount() {
    this.viewportEl.scrollLeft = 0;

    this.updateScrollControlState();
    this.updateScrollSliderState();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScrollControlState();
    this.updateScrollSliderState();
  }

  viewportEl = null;
  scrollSliderEl = null;
  disableScrollSliderChangeHandler = false;

  moveScroll = delta => {
    if (this.viewportEl) {
      const { scrollWidth, clientWidth } = this.viewportEl;
      const scrollLeft = getNormalizedScrollLeft(this.viewportEl);
      let nextScrollLeft = scrollLeft + delta;

      if (delta > 0 && scrollWidth - nextScrollLeft - clientWidth < 24) {
        nextScrollLeft += scrollWidth - nextScrollLeft - clientWidth;
      } else if (delta < 0 && nextScrollLeft < 24) {
        nextScrollLeft = 0;
      }

      scroll.left(this.viewportEl, nextScrollLeft);
    }
  };

  moveScrollSlider = () => {
    if (this.viewportEl && this.scrollSliderEl) {
      const scrollLeft = getNormalizedScrollLeft(this.viewportEl);
      const { scrollWidth, clientWidth } = this.viewportEl;
      const scrollSliderX = scrollLeft / (scrollWidth - clientWidth);

      this.scrollSliderEl.dragdealer.setValue(scrollSliderX, 0);
    }
  };

  updateScrollControlState = () => {
    if (this.viewportEl) {
      const { scrollWidth, clientWidth } = this.viewportEl;
      const scrollLeft = getNormalizedScrollLeft(this.viewportEl);
      const disabledNavPrev = scrollLeft === 0;
      const disabledNavNext = scrollWidth <= clientWidth + scrollLeft + 24;

      if (this.state.disabledNavNext !== disabledNavNext || this.state.disabledNavPrev !== disabledNavPrev) {
        this.setState({ disabledNavPrev, disabledNavNext });
      }
    }
  };

  updateScrollSliderState = () => {
    const { enableScrollSlider } = this.props;

    if (this.viewportEl && enableScrollSlider) {
      const { scrollWidth, clientWidth } = this.viewportEl;
      const xPrecision = scrollWidth - clientWidth;
      const sliderWidth = parseInt(clientWidth / (scrollWidth / clientWidth), 10);

      if (this.state.scrollSlider.sliderWidth !== sliderWidth) {
        this.setState({ scrollSlider: { xPrecision, sliderWidth } });
      }
    }
  };

  handleScroll = () => {
    if (!this.disableScrollSliderChangeHandler) {
      this.moveScrollSlider();
    }
    this.updateScrollControlState();
    this.disableScrollSliderChangeHandler = false;
  };

  handleResise = _debounce(() => {
    this.updateScrollControlState();
    this.updateScrollSliderState();
  }, 166);

  handleNextScrollClick = () => {
    if (this.viewportEl) {
      this.moveScroll(this.viewportEl.clientWidth);
    }
  };

  handlePrevScrollClick = () => {
    if (this.viewportEl) {
      this.moveScroll(-this.viewportEl.clientWidth);
    }
  };

  handleScrollbarSizeChange = ({ scrollbarHeight }) => {
    this.setState({ scrollerStyle: { marginBottom: -scrollbarHeight } });
  };

  handleScrollSliderChange = x => {
    if (this.viewportEl) {
      this.disableScrollSliderChangeHandler = true;
      this.viewportEl.scrollLeft = x * (this.viewportEl.scrollWidth - this.viewportEl.clientWidth);
    }
  };

  renderLoading = () => (
    <div className="feed-carousel__loading">
      <div className="infinite-spinner size-36" />
    </div>
  );

  renderScrollSlider = () => {
    const { enableScrollSlider } = this.props;
    const { scrollSlider: { xPrecision, sliderWidth } } = this.state;

    if (!this.viewportEl || !enableScrollSlider) {
      return null;
    }

    const { scrollWidth, clientWidth } = this.viewportEl;

    if (scrollWidth <= clientWidth + 24) {
      return null;
    }

    return (
      <ScrollSlider
        onChange={this.handleScrollSliderChange}
        xPrecision={xPrecision}
        sliderWidth={sliderWidth}
        ref={el => {
          this.scrollSliderEl = el;
        }}
      />
    );
  };

  render() {
    const { disabledNavNext, disabledNavPrev, scrollerStyle } = this.state;
    const { data, renderItem, onItemClick } = this.props;

    if (!data || !data.length) {
      return null;
    }

    return (
      <div className="feed-carousel">
        <EventListener target="window" onResize={this.handleResise} />
        <ScrollbarSize onLoad={this.handleScrollbarSizeChange} onChange={this.handleScrollbarSizeChange} />
        <div className="feed-carousel__viewport">
          <ScrollControl direction="prev" disabled={disabledNavPrev} onClick={this.handlePrevScrollClick} />
          <div
            className="viewport__scroller"
            style={scrollerStyle}
            onScroll={this.handleScroll}
            ref={el => {
              this.viewportEl = el;
            }}
          >
            <div className="scroller__body">
              {data.map((item, index) => (
                <FeedItem key={index} onItemClick={ev => onItemClick(ev, item)}>
                  {renderItem(item)}
                </FeedItem>
              ))}
            </div>
          </div>
          <ScrollControl direction="next" disabled={disabledNavNext} onClick={this.handleNextScrollClick} />
        </div>
        {this.renderScrollSlider()}
      </div>
    );
  }
}

FeedCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
  enableScrollSlider: PropTypes.bool
};

FeedCarousel.defaultProps = {
  enableScrollSlider: false,
  onItemClick: f => f
};

export default FeedCarousel;
