import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import Us from './user.module.css';
import { page } from './pages.jsx';

class User extends Component {
    render() {
        return (
            <Row className="Us.main">
                <Col sm="4">
                    <Card body className="Us.card">
                        <img className={Us.image} src={page.page1} alt="Horror" />
                        <CardTitle>Fisrt Card</CardTitle>
                        <CardText>
                            With my them if up many. 
                            Lain week nay she them her she.
                            Extremity so attending objection as engrossed gentleman something.
                            Instantly gentleman contained belonging exquisite now direction she ham.
                            West room at sent if year.
                            Numerous indulged distance old law you. 
                        </CardText>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card body className="Us.card">
                        <img className={Us.image} src={page.page2} alt="Dark" />
                        <CardTitle>Secondd Card</CardTitle>
                        <CardText>
                            Total state as merit court green decay he.
                            Steepest sex bachelor the may delicate its yourself.
                            As he instantly on discovery concluded to.
                            Open draw far pure miss felt say yet few sigh. 
                            West room at sent if year.
                            Numerous indulged distance old law you. 
                        </CardText>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card body className="Us.card">
                        <img className={Us.image} src={page.page3} alt="King"/>
                        <CardTitle>Third Card</CardTitle>
                        <CardText>
                            In it except to so temper mutual tastes mother. 
                            Interested cultivated its continuing now yet are.
                            Out interested acceptance our partiality affronting unpleasant why add. 
                            Esteem garden men yet shy course. 
                        </CardText>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default User;
