import React from 'react';
import { Slide } from 'react-slideshow-image';
import './Slider.css'




const Slider = () => {
  return (
    <Slide >
      <div className="each-slide">
        <img src=  'https://placeimg.com/480/360/any' alt='img' />
      </div>
      <div className="each-slide"> 
        <img src ='https://placeimg.com/640/480/people?t=1559044767799' alt='img'/>
      </div>
    <div className="each-slide">
      <img src ='https://placeimg.com/480/360' alt='img'/>
        
    </div>
      </Slide >
    )
}
export default Slider;