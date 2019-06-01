import React from 'react';
import { Collapse, CardBody, Button, Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import './about.css'

class About extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
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
                              <Button color="primary" onClick={this.toggle}>More</Button>
                                  <Collapse isOpen={this.state.collapse}>
                                    <Card>
                                      <CardBody>
                                      Anim pariatur cliche reprehenderit,
                                       enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                       anim keffiyeh helvetica, craft beer labore wes anderson cred
                                       nesciunt sapiente ea proident.
                                      </CardBody>
                                    </Card>
                                  </Collapse>
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
