import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[0-9]{10,15}$/;

        if (!formData.name) {
            newErrors.name = 'Пожалуйста, введите ваше ФИО.';
        }

        if (!formData.phone || !phonePattern.test(formData.phone)) {
            newErrors.phone = 'Пожалуйста, введите корректный номер телефона.';
        }

        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Пожалуйста, введите корректный email.';
        }

        if (!formData.age) {
            newErrors.age = 'Пожалуйста, введите возраст ребенка.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:3000/api/trial', formData);
                console.log('Success:', response.data);
                setAlertMessage('Вы успешно записались на пробное занятие!');
                setAlertVariant('success');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            } catch (error) {
                console.error('Error:', error);
                setAlertMessage(error.response?.data?.message || 'Произошла ошибка при записи на пробное занятие.');
                setAlertVariant('danger');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
        }
    };

    return (
        <div style={{ minHeight: '90vh' }}>
            <Container>
                <Carousel className='mt-3'>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://localhost:3000/img/slider1.jpg"
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
                            src="http://localhost:3000/img/slider.jpg"
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
                            src="http://localhost:3000/img/slider2.jpg"
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
                        <h2 className='text-center mt-3'>Наши преимущества</h2>
                    </Col>
                </Row>

                <Row className="my-4">
                    <Col md={3} className="d-flex justify-content-center">
                        <Card style={{ height: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card.Img style={{ width: '50%', marginTop: '2vh' }} variant="top" src="http://localhost:3000/img/good1.png" />
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Квалифицированные учителя</Card.Title>
                                <Card.Text>
                                    Наши преподаватели — это профессионалы с большим опытом работы.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        <Card style={{ height: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card.Img style={{ width: '50%', marginTop: '2vh' }} variant="top" src="http://localhost:3000/img/good2.png" />
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Современные технологии</Card.Title>
                                <Card.Text>
                                    Мы используем передовые методики и технологии в обучении.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        <Card style={{ height: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card.Img style={{ width: '50%', marginTop: '2vh' }} variant="top" src="http://localhost:3000/img/good3.png" />
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Индивидуальный подход</Card.Title>
                                <Card.Text>
                                    Каждый ученик получает внимание и поддержку, необходимые для успешного обучения.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        <Card style={{ height: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card.Img style={{ width: '50%', marginTop: '2vh' }} variant="top" src="http://localhost:3000/img/good4.png" />
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Разнообразные внеклассные мероприятия</Card.Title>
                                <Card.Text>
                                    Спортивные секции, кружки по интересам и культурные мероприятия.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="my-4 d-flex justify-content-center mt-5">
                    <Col md={6} style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '30px', maxWidth: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-center mb-4'>Запись на пробное занятие</h2>
                        {showAlert && (
                            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                                {alertMessage}
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>ФИО</Form.Label>
                                <Form.Control type="text" placeholder="Введите ваше ФИО" name="name" value={formData.name} onChange={handleChange} style={{ borderRadius: '5px' }} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Контактный телефон</Form.Label>
                                <Form.Control type="text" placeholder="Введите ваш телефон (+7123456789)" name="phone" value={formData.phone} onChange={handleChange} style={{ borderRadius: '5px' }} isInvalid={!!errors.phone} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" placeholder="Введите ваш email" name="email" value={formData.email} onChange={handleChange} style={{ borderRadius: '5px' }} isInvalid={!!errors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formAge" className="mb-3">
                                <Form.Label>Возраст ребенка</Form.Label>
                                <Form.Control type="text" placeholder="Введите возраст ребенка" name="age" value={formData.age} onChange={handleChange} style={{ borderRadius: '5px' }} isInvalid={!!errors.age} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.age}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-3" style={{ borderRadius: '5px', backgroundColor: '#007bff', border: 'none' }}>
                                Записаться на пробное занятие
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeScreen;
