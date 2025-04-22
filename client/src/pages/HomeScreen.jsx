import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import Reviews from '../components/Reviews';
import TrialLessonForm from '../components/TrialForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrialForm from '../components/TrialForm';

const HomeScreen = () => {
    return (
        <div style={{ minHeight: '90vh' }}>
            <Container>
                <Carousel className='mt-3' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '25px' }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://localhost:3000/static/slider1.jpg"
                            alt="First slide"
                            style={{ height: '700px', objectFit: 'cover', borderRadius: '25px' }}
                        />
                        <Carousel.Caption>
                            <h3>Добро пожаловать в нашу школу!</h3>
                            <p>Мы рады видеть вас.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://localhost:3000/static/slider.jpg"
                            alt="Second slide"
                            style={{ height: '700px', objectFit: 'cover', borderRadius: '25px' }}
                        />
                        <Carousel.Caption>
                            <h3>Образование, которое вдохновляет и мотивирует.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://localhost:3000/static/slider2.jpg"
                            alt="Third slide"
                            style={{ height: '700px', objectFit: 'cover', borderRadius: '25px' }}
                        />
                        <Carousel.Caption>
                            <h3>События и мероприятия, которые объединяют нас.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Row className="my-4">
                    <Col>
                        <h2 className='text-center mt-3'>О нашей школе</h2>
                    </Col>
                </Row>

                <Row className="my-4 school_cards" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <img
                            src="http://localhost:3000/static/home1.jpg"
                            alt="School"
                            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                        />
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <div style={{ textAlign: 'left', padding: '20px' }}>
                            <h3>Наша миссия</h3>
                            <p>
                                Наша школа самбо стремится развивать физические и моральные качества детей, готовить их к жизни через спорт. <br /> Мы верим, что самбо помогает формировать характер, дисциплину и уважение к другим.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="my-4 school_cards" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <div style={{ textAlign: 'left', padding: '20px' }}>
                            <h3>Наши достижения</h3>
                            <p>
                                За годы работы наша школа достигла значительных успехов. <br /> Наши ученики регулярно занимают призовые места на соревнованиях различного уровня, от местных турниров до международных чемпионатов.
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <img
                            src="http://localhost:3000/static/home2.jpg"
                            alt="School"
                            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                        />
                    </Col>
                </Row>

                <Row className="my-4 mt-5">
                    <Col>
                        <h2 className='text-center mt-3'>Наши преимущества</h2>
                    </Col>
                </Row>

                <Row className="my-4">
                    {[
                        {
                            img: 'good1.png',
                            title: 'Квалифицированные учителя',
                            text: 'Наши преподаватели — это профессионалы с большим опытом работы.'
                        },
                        {
                            img: 'good2.png',
                            title: 'Современные технологии',
                            text: 'Мы используем передовые методики и технологии в обучении.'
                        },
                        {
                            img: 'good3.png',
                            title: 'Индивидуальный подход',
                            text: 'Каждый ученик получает внимание и поддержку, необходимые для успешного обучения.'
                        },
                        {
                            img: 'good4.png',
                            title: 'Разнообразные мероприятия',
                            text: 'Спортивные секции, кружки по интересам и культурные мероприятия.'
                        }
                    ].map((item, idx) => (
                        <Col key={idx} md={3} className="d-flex justify-content-center">
                            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Card.Img style={{ width: '50%', marginTop: '2vh' }} variant="top" src={`http://localhost:3000/static/${item.img}`} />
                                <Card.Body style={{ textAlign: 'center' }}>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="my-4 d-flex justify-content-center mt-5">
                    <Col md={6}>
                        <TrialForm />
                    </Col>
                </Row>

                <Reviews />
            </Container>
        </div>
    );
};

export default HomeScreen;
