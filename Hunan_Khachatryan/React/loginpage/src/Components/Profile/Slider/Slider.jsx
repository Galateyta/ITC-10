import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
class DemoCarousel extends Component {
  render() {
    return (
      <div className='sliderCon'>
      <Carousel  >
        <div>
          <img  className='slider' src="https://placeimg.com/640/480/any/grayscale" />
        </div>
        <div>
          <img  className='slider' src="https://placeimg.com/640/480/people?t=1559044767799" />
        </div>
        <div>
          <img  className='slider'src="https://placeimg.com/640/480/nature" />
        </div>
        <div>
          <img  className='slider' src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
        </div>

      </Carousel>
      </div>
    );

  }
}
export default DemoCarousel