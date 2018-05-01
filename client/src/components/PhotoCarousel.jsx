import React from 'react';
import { Carousel } from 'react-bootstrap';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;
    let carousels = this.props.nearbyRestaurant.photos.map((photoID, index) => {
      if (index < 5) {
        return (
          <Carousel.Item key={index}>
            <img src={'https://s3-us-west-1.amazonaws.com/apateezgallery93/' + photoID +'.png'} />
          </Carousel.Item>
        )
      }
    })

    return (
      <div className="restaurant-photocarousel">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          {carousels}
        </Carousel>
      </div>
    )
  }
}

module.exports = PhotoCarousel;