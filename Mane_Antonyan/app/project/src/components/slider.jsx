import React from 'react';  
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { page } from './pages.jsx';

const Slider = () => {
  const handleOnDragStart = event => event.preventDefault();
  return (
    <AliceCarousel mouseDragEnabled >
      <img src={page.page1} onDragStart={handleOnDragStart} className="yours-custom-class image" />
      <img src={page.page2} onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={page.page3} onDragStart={handleOnDragStart} className="yours-custom-class" />
    </AliceCarousel>
  );
}

export default Slider;