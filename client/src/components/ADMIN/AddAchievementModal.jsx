import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddAchievementModal = ({ show, handleClose, onAchievementAdded, userId }) => {
    const [competitionName, setCompetitionName] = useState('');
    const [place, setPlace] = useState('');
    const [weightCategory, setWeightCategory] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!competitionName || !place || !weightCategory || !date) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/achievements', {
                userId,
                competitionName,
                place,
                weightCategory,
                date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onAchievementAdded();
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить достижение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCompetitionName">
                        <Form.Label>Название соревнования</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название соревнования"
                            value={competitionName}
                            onChange={(e) => setCompetitionName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPlace">
                        <Form.Label>Место</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите место"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formWeightCategory">
                        <Form.Label>Весовая категория</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите весовую категорию"
                            value={weightCategory}
                            onChange={(e) => setWeightCategory(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Дата соревнования</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className='mt-2' variant="primary" type="submit">
                        Добавить достижение
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAchievementModal;
