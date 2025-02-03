import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [showFullReview, setShowFullReview] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

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

    return (
        <Container>
            <h2 className='text-center mt-3'>Управление отзывами</h2>
            <Row>
                {reviews.map(review => (
                    <Col key={review.id} md={4} className="mb-4">
                        <Card style={{ height: '300px' }}>
                            <Card.Body style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <Card.Title>{review.name} {review.surname}</Card.Title>
                                    <Card.Text>{review.email}</Card.Text>
                                    <Card.Text>{new Date(review.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Card.Text>
                                    <Card.Text style={{ cursor: 'pointer' }} onClick={() => handleShowFullReview(review)}>
                                        {review.message.length > 100 ? `${review.message.substring(0, 100)}...` : review.message}
                                    </Card.Text>
                                </div>
                                <Button variant="danger" onClick={() => handleDelete(review.id)}>Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showFullReview} onHide={handleCloseFullReview}>
                <Modal.Header closeButton>
                    <Modal.Title>Полный отзыв</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReview && (
                        <>
                            <Card.Title>{selectedReview.name} {selectedReview.surname}</Card.Title>
                            <Card.Text>{selectedReview.email}</Card.Text>
                            <Card.Text>{new Date(selectedReview.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Card.Text>
                            <Card.Text>{selectedReview.message}</Card.Text>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ReviewManagement;
