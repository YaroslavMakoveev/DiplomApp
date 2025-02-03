import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showFullReview, setShowFullReview] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const reviewsPerPage = 6;
    const initialReviewsCount = 3;

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = async () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const namePattern = /^[а-яА-ЯёЁ\s]+$/;

        if (!formData.name || !namePattern.test(formData.name)) {
            newErrors.name = 'Пожалуйста, введите корректное имя.';
        }
        if (formData.surname && !namePattern.test(formData.surname)) {
            newErrors.surname = 'Пожалуйста, введите корректную фамилию.';
        }
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Пожалуйста, введите корректный email.';
        }

        // Проверка на существование отзыва с указанной почтой
        try {
            const response = await axios.get(`http://localhost:3000/api/reviews?email=${formData.email}`);
            if (response.data.length > 0) {
                newErrors.email = 'Под этой почтой уже оставлен отзыв.';
            }
        } catch (error) {
            console.error('Error checking existing review:', error);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const isValid = await validate();
        if (isValid) {
            try {
                await axios.post('http://localhost:3000/api/reviews', formData);
                fetchReviews();
                setFormData({ name: '', surname: '', email: '', message: '' });
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleShowFullReview = (review) => {
        setSelectedReview(review);
        setShowFullReview(true);
    };

    const handleCloseFullReview = () => {
        setShowFullReview(false);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const displayedReviews = showAllReviews ? currentReviews : reviews.slice(0, initialReviewsCount);

    return (
        <Container>
            <h2 className='text-center mt-3'>Отзывы о нас</h2>
            <Row>
                {displayedReviews.map(review => (
                    <Col key={review.id} md={4} className="mb-4">
                        <Card style={{ height: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                            <Card.Body style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
                                <div>
                                    <Card.Title style={{ fontWeight: 'bold' }}>{review.name} {review.surname}</Card.Title>
                                    <Card.Text>{review.email}</Card.Text>
                                    <Card.Text>{new Date(review.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Card.Text>
                                    <Card.Text style={{ cursor: 'pointer', whiteSpace: 'pre-line' }} onClick={() => handleShowFullReview(review)}>
                                        {review.message.length > 100 ? `${review.message.substring(0, 100)}...` : review.message}
                                    </Card.Text>
                                </div>
                                <Button variant="danger" onClick={() => handleDelete(review.id)}>Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {!showAllReviews && reviews.length > initialReviewsCount && (
                <Button variant="primary" onClick={() => setShowAllReviews(true)} style={{ marginBottom: '20px' }}>Больше отзывов</Button>
            )}
            {showAllReviews && (
                <>
                    <Pagination style={{ justifyContent: 'center', marginBottom: '20px' }}>
                        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                    <Button variant="secondary" onClick={() => setShowAllReviews(false)}>Меньше отзывов</Button>
                </>
            )}
            <Row style={{ justifyContent: 'center', marginTop: '40px' }}>
                <Col md={6}>
                    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px' }}>
                        <Card.Body>
                        <h2 className='text-center mb-4'>Оставьте свой отзыв</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder='Обязательно' name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} style={{ borderRadius: '5px' }} />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formSurname" className="mb-3">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" placeholder='Необязательно' name="surname" value={formData.surname} onChange={handleChange} isInvalid={!!errors.surname} style={{ borderRadius: '5px' }} />
                                    <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder='Обязательно' name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} style={{ borderRadius: '5px' }} />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label>Сообщение</Form.Label>
                                    <Form.Control as="textarea" placeholder='Ваш отзыв' name="message" value={formData.message} onChange={handleChange} style={{ borderRadius: '5px' }} />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isSubmitting} style={{ borderRadius: '5px', backgroundColor: '#007bff', border: 'none' }}>
                                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showFullReview} onHide={handleCloseFullReview}>
                <Modal.Header closeButton>
                    <Modal.Title>Полный отзыв</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReview && (
                        <>
                            <Card.Title style={{ fontWeight: 'bold' }}>{selectedReview.name} {selectedReview.surname}</Card.Title>
                            <Card.Text>{selectedReview.email}</Card.Text>
                            <Card.Text>{new Date(selectedReview.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Card.Text>
                            <Card.Text style={{ whiteSpace: 'pre-line' }}>{selectedReview.message}</Card.Text>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Reviews;
