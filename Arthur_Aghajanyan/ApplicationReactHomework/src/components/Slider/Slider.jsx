import React, { Component } from 'react';
import {Container, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import './slider.css'

const items = [{src: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                caption: 'Slide 1'},
               {src: 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                caption: 'Slide 2'},
               {src: 'https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295431__340.jpg',
                caption: 'Slide 3'}
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
                    key={item.src}>
                    <img className = 'carusel-style' src={item.src} alt='img'/>
                    <CarouselCaption captionText={item.caption} />
                </CarouselItem>
                );
              });
              return (
              <Container className = 'carusel-page-style'>
                  <Carousel
                      activeIndex={activeIndex}
                      next={this.next}
                      previous={this.previous}>
                      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                      {slides}
                      <CarouselControl className = 'control-style' direction = 'prev' directionText = 'Previous' onClickHandler={this.previous} />
                      <CarouselControl className = 'control-style' direction = 'next' directionText = 'Next' onClickHandler={this.next} />
                  </Carousel>
              </Container>
        );
      }
}
export default Slider;
