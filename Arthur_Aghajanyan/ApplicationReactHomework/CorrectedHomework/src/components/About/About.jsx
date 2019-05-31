import React from 'react';
import { Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import './about.css'

class About extends React.Component {

    constructor(props) { 
        debugger
        super(props);
    }
    
    render() {
      return (
          <Container>
              <div className = 'about-style'>
                  <Row>
                      <Col md = '4' sm = '12'>
                          <Card body className = 'card-style'>
                              <img className = 'about-img-style' src = 'https://www.adster.ch/wp-content/uploads/2018/09/user.png' alt = 'img'/>
                              <CardTitle>Special Title Treatment</CardTitle>
                              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          </Card>
                      </Col>
                      <Col md = '4' sm = '12'>
                          <Card body className = 'card-style'>
                              <img className = 'about-img-style' src = 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png' alt = 'img'/>
                              <CardTitle>Special Title Treatment</CardTitle>
                              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          </Card>
                      </Col>
                      <Col md = '4' sm = '12'>
                          <Card body className = 'card-style'>
                              <img className = 'about-img-style' src = 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt = 'img'/>
                              <CardTitle>Special Title Treatment</CardTitle>
                              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          </Card>
                      </Col>
                  </Row>
              </div>
          </Container>

      );
    }
}
export default About;
