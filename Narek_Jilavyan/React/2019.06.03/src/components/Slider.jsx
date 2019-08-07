import React, { Component } from 'react';
import { Carousel,CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import home from './Home.module.css';
const items = [
    {
      src: 'https://get.wallhere.com/photo/Japan-sunset-city-cityscape-night-reflection-sky-skyline-skyscraper-evening-morning-horizon-panorama-dusk-Yokohama-Tokyo-cloud-downtown-bluehour-dawn-ferriswheel-landmark-kanagawa-magichour-urban-area-atmosphere-of-earth-widescreen-human-settlement-geographical-feature-magicmoment-sakuragicho-landmarktower-yokohamainternationalpassengerterminal-yokohamaredbrickwarehous-538925.jpg',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'https://get.wallhere.com/photo/Japan-lights-city-cityscape-night-urban-building-photography-skyline-skyscraper-evening-tower-horizon-dusk-metropolis-Tokyo-Tokyo-Tower-downtown-landmark-urban-area-metropolitan-area-human-settlement-geographical-feature-tower-block-aerial-photography-80107.jpg',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'https://get.wallhere.com/photo/Japan-lights-city-cityscape-night-Asia-urban-building-skyline-skyscraper-evening-life-dusk-metropolis-Tokyo-GIMP-pentax-Nihon-2014-light-downtown-buildings-landmark-hamamatsucho-urban-area-metropolitan-area-human-settlement-geographical-feature-tower-block-540262.jpg',
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
    

      //<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
    
    
}
export default Slider;