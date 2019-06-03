import React,{Component} from 'react';
import CarouselSlider from "react-carousel-slider";
import './Slider.css'
class Slider extends Component {
	state = {
		valu:''
	}

	getInitialState= () => {
	  return {value: 0};
	}

	handleChange = (e) =>{
	  this.setState({value: e.target.value});
	}

	render () {
		let data = [
            {
                des: "1",
                imgSrc: "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
            },
            {
                des: "2",
                imgSrc: "http://hdwpro.com/wp-content/uploads/2015/12/Birds-Image.jpg"
            },
						{
                des: "3",
                imgSrc: "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg"
            },
						{
                des: "4",
                imgSrc: "https://wallpaper-gallery.net/images/image-wallpaper/image-wallpaper-10.jpg"
						},
						{
                des: "5",
                imgSrc: "https://images2.alphacoders.com/191/191502.jpg"
            },
						{
                des: "6",
                imgSrc: "http://www.webpage-maker.com/guide/images/200821911435669_2.jpg"
						},
        ];

		return (

				<div className="myCarousel">
				<CarouselSlider  slideItems = {data} />

				</div>

			);
	}
}


export {Slider}
