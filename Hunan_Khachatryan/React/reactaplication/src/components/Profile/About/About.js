import React from 'react';
import { Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import './About.css'

class About extends React.Component {
    render() {
        return (
            <Container>
                <div className='about-style'>
                    <Row>
                        <Col >
                            <Card body className='card-style'>
                                <img className='about-img-style' src='https://www.adster.ch/wp-content/uploads/2018/09/user.png' alt='img' />
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
