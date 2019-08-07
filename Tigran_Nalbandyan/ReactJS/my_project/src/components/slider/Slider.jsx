import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import {Paper} from '@material-ui/core';
import './Slider.css';

class Slider extends React.Component {
  render() {
    return (
      <Paper id="slider">
        <h2>Slider</h2>
        <InfiniteCarousel
          breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
          autoCycle={true}
          dots={true}
          showSides={true}
          sidesOpacity={.5}
          sideSize={0.5}
          slidesToScroll={1}
          slidesToShow={1}
          scrollOnDevice={true}>
          <div>
            <img alt='' src='https://placeimg.com/800/600/nature/1'/>
          </div>
          <div>
            <img alt='' src='https://placeimg.com/800/600/nature/2'/>
          </div>
          <div>
            <img alt='' src='https://placeimg.com/800/600/nature/3'/>
          </div>
        </InfiniteCarousel>
      </Paper>
    );
  }
}

export default Slider;