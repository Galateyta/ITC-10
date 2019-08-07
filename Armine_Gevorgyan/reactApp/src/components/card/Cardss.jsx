import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button } from 'reactstrap';

import img1 from '../../images/5.jpg';
import img2 from '../../images/6.jpg';
import img3 from '../../images/2.jpg';
import './card.css'
class Mycards extends Component{
  renderCard = (src) => {
    return (
      <div  className="cardDiv">
        <Card>
          <CardImg top width="20%" src={src} alt="Card image" />
          <div>
          <CardBody className="cardBody"><br/>
            <br/><CardTitle>Card title example text to build</CardTitle><br/>
            <CardSubtitle>Some quick example text</CardSubtitle><br/>
            <CardText>Some quick example text to build</CardText>
          </CardBody></div>
        </Card>
      </div>
    );
  }

  render () {
  return (
    <div>
      {this.renderCard(img1)}
      {this.renderCard(img2)}
      {this.renderCard(img3)}
    </div>
  );
}
};



export {Mycards}
