import React from "react";
import PropTypes from "prop-types";

import FeedCarousel from "../components/ui/FeedCarousel";

class BrandsCarousel extends React.Component {
  onItemClick = (ev, data) => {
    console.log(data);
  };

  renderItem = data => (
    <div className="brands-carousel__item">
      <img src={data.picture} alt={data.title} title={data.title} />
    </div>
  );

  render() {
    return (
      <div className="brands-carousel carousel-container">
        <header className="carousel-container__header">
          <h3 className="carousel-container__title">Brands</h3>
        </header>
        <FeedCarousel data={this.props.data} renderItem={this.renderItem} onItemClick={this.onItemClick} />
      </div>
    );
  }
}

BrandsCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      picture: PropTypes.sting
    })
  ).isRequired
};

export default BrandsCarousel;
