import React, { Component } from 'react';
import {Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

class About extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/25/461264-reactJS-Facebook-JavaScript-minimalism-artwork-simple_background-748x421.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>React</CardTitle>
                                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content.
                                     This content is a little bit longer.This content is a little bit 
                                     This is a wider card with supporting text below as a natural lead-in to additional content
                                     </CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTly7tTdnDVJId7G7WpfUZInPZ3UEFFN1l8FpPRB0QcrWwRjjUP" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Redux</CardTitle>
                                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content.
                                     This content is a little bit longer.This content is a little bit longer
                                     This is a wider card with supporting text below as a natural lead-in to additional content
                                     </CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/25/461803-angular-JavaScript-HTML-748x421.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Angular</CardTitle>
                                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content.
                                     This content is a little bit longer.This content is a little bit longer
                                     This is a wider card with supporting text below as a natural lead-in to additional content
                                     </CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default About;