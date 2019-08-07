import React, { Component } from 'react';
import {Row, Col, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

class About extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://cdn.allwallpaper.in/wallpapers/1920x1080/4553/evans-marvel-steve-rogers-the-avengers-movie-1920x1080-wallpaper.jpg" alt="Капитан Америка"/>
                            <CardBody>
                                <CardTitle>Капитан Америка</CardTitle>
                                <CardText>Капитан Америка — это целенаправленно созданный патриотический персонаж. Его часто изображали сражающимся с гитлеровской коалицией государств. Капитан Америка был самым популярным персонажем в период Второй мировой войны, однако когда война закончилась, популярность этого персонажа уменьшилась, и к 1950 годам его перестали использовать, за исключением неудачного возрождения в 1953 году. Данный персонаж стал заново использоваться в комиксах лишь в период, известный как Серебряный век комиксов, когда стал членом команды супергероев Мстителей в выпускеThe Avengers #4 (март 1964). 
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://cdn.allwallpaper.in/wallpapers/1920x1080/4393/hawkeye-jeremy-renner-the-avengers-movie-arrows-1920x1080-wallpaper.jpg" alt="Соколиный глаз" />
                            <CardBody>
                                <CardTitle>Соколиный глаз</CardTitle>
                                <CardText>Соколиный глаз впервые появился в выпуске Tales of Suspense #57 в сентябре 1964 года, в качестве персонажа, который был вынужден сотрудничать со злодеями. Он появился в этом качестве ещё в двух выпусках Tales of Suspense #60 и #64 (декабрь 1964 и апрель 1965 года). Соколиный глаз вступил в ряды Мстителей в выпуске Avengers Vol.1 #16 в мае 1965 года, и стал многолетним членом команды, многократно появлялся во всех четырёх томах серии Vol.1 (1963—1996), Vol.2 (1997), Vol.3 (1999—2004), Vol.4 (2010-настоящее время), включая спецвыпуски и ежегодники, а также Ultimates и Secret Wars #1-12 (1984—1985).
                                     </CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardImg top width="100%" src="https://cdn.allwallpaper.in/wallpapers/1920x1080/4625/chris-hemsworth-mjolnir-the-avengers-movie-thor-1920x1080-wallpaper.jpg" alt="Тор" />
                            <CardBody>
                                <CardTitle>Тор</CardTitle>
                                <CardText>О́дин — владыка богов Асгарда, желал сына Асгарда и Мидгарда (Земли) и потому долгое время добивался Геи — самой старшей богини Земли. Гея родила ему сына Тора в маленькой норвежской пещере. Один забрал аутиста, чтобы растить его в Асгарде вместе со своей женой Фригг.
                                    Тор рос рядом со своим братом Локи, приёмным сыном Одина, который всегда завидовал ему, так как тому доставалось всё самое лучшее. Тор всегда выделялся среди других, и на восьмом дне рождения Один подарил своему сыну Мьёльнир — молот, зачарованный особой магией. Но получить он его сможет, когда докажет, что является достойным воином.
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