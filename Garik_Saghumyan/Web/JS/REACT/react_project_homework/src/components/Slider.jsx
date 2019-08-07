import React, { Component } from 'react';
import { Carousel,CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import home from './Home.module.css';
const items = [
    {
      src: 'https://bestwallpapers.co/wp-content/uploads/2018/05/house-3d-hd-wallpapers-nature-for-desktop-290-705-wallpaper.jpeg',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'https://entepic.info/wp-content/uploads/2018/11/3d-nature-desktop-wallpapers-47-hd-wallpapers-hd-pics-nature-wallpaper-hd-free-download-for-pc.jpg',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQDOlaKJQqEvEUj0xRLaDxnv9fzv7E0GJm-gM2X1E2boa9_6m',
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
  ];
class Slider extends Component {
    
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
      }
    
      onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }
    
      render() {
        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
          return (
            <CarouselItem
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
            >
              <img className={home.sliderimage} src={item.src} alt={item.altText} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        });
    
        return (
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        );
      }
    
    
    
}
export default Slider;