import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrialLessonAdmin = () => {
    const [trialLessons, setTrialLessons] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [confirmDateTime, setConfirmDateTime] = useState('');

    useEffect(() => {
        fetchTrialLessons();
    }, []);

    const fetchTrialLessons = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/trial');
            setTrialLessons(response.data);
        } catch (error) {
            console.error('Error fetching trial lessons:', error);
        }
    };

    const handleConfirm = async (lesson) => {
        setSelectedLesson(lesson);
        setShowConfirmModal(true);
    };

    const handleCancel = async (lesson) => {
        setSelectedLesson(lesson);
        setShowCancelModal(true);
    };

    const confirmLesson = async () => {
        try {
            await axios.post(`http://localhost:3000/api/trial/confirm`, {
                id: selectedLesson.id,
                confirmDateTime
            });
            setShowConfirmModal(false);
            fetchTrialLessons();
        } catch (error) {
            console.error('Error confirming trial lesson:', error);
        }
    };

    const cancelLesson = async () => {
        try {
            await axios.post(`http://localhost:3000/api/trial/cancel`, {
                id: selectedLesson.id,
                cancelReason
            });
            setShowCancelModal(false);
            fetchTrialLessons();
        } catch (error) {
            console.error('Error canceling trial lesson:', error);
        }
    };

    return (
        <Container style={{minHeight: '90vh'}}>
            {trialLessons.length === 0 ? (
                <Row>
                    <Col>
                        <h2 className="text-center mt-5">Заявок нет</h2>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {trialLessons.map(lesson => (
                        <Col key={lesson.id} md={6} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{fontWeight: '500', fontSize: '25px'}}>{lesson.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Номер телефона:</strong> {lesson.phone}<br />
                                        <strong>Адрес эл. почты:</strong> {lesson.email}<br />
                                        <strong>Возраст ребенка:</strong> {lesson.age}<br />
                                        <strong>Сообщение:</strong> {lesson.message}
                                    </Card.Text>
                                    {lesson.status === 'Рассматривается' && (
                                        <>
                                            <Button className='me-2' variant="success" onClick={() => handleConfirm(lesson)}>Подтвердить</Button>
                                            <Button variant="danger" onClick={() => handleCancel(lesson)}>Отменить</Button>
                                        </>
                                    )}
                                    {lesson.status !== 'Рассматривается' && (
                                        <Card.Text>
                                            <strong>Статус:</strong>
                                            {lesson.status === 'Подтверждена' ? (
                                                <span className="text-success"> {lesson.status}</span>
                                            ) : (
                                                <span className="text-danger"> {lesson.status}</span>
                                            )}
                                        </Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение заявки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Дата и время</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={confirmDateTime}
                            onChange={(e) => setConfirmDateTime(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)} // Ограничение на выбор даты и времени в будущем
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={confirmLesson}>Подтвердить</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Отмена заявки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Причина отмены</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={cancelLesson}>Отменить</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TrialLessonAdmin;
