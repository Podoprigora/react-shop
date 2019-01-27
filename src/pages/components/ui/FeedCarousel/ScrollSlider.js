import React from "react";
import PropTypes from "prop-types";
import Dragdealer from "dragdealer";

class ScrollSlider extends React.Component {
    componentDidMount() {
        const { xPrecision, onChange } = this.props;
        let disabledEventHandler = true;

        this.dragdealer = new Dragdealer(this.dragdealerEl, {
            handleClass: "scroll-slider__bar",
            horizontal: true,
            vertical: false,
            xPrecision,
            right: 0,
            left: 0,
            speed: 0.35,
            animationCallback: x => {
                if (!disabledEventHandler && onChange) {
                    onChange(x);
                }
            },
            callback: x => {
                disabledEventHandler = true;
            },
            dragStartCallback: x => {
                disabledEventHandler = false;
            }
        });
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.sliderWidth !== this.props.sliderWidth;
    }

    componentDidUpdate() {
        this.dragdealer.reflow();
    }

    dragdealerEl = null;
    dragdealer = null;

    render() {
        const { sliderWidth } = this.props;

        return (
            <div
                className="feed-carousel__scroll-slider"
                ref={el => {
                    this.dragdealerEl = el;
                }}
            >
                <div className="scroll-slider__bar" style={{ width: sliderWidth }} />
            </div>
        );
    }
}

ScrollSlider.propTypes = {
    onChange: PropTypes.func,
    xPrecision: PropTypes.number,
    sliderWidth: PropTypes.number
};

ScrollSlider.defaultProps = {
    xPrecision: 0,
    sliderWidth: 60
};

export default ScrollSlider;
