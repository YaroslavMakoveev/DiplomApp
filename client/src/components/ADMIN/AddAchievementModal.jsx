import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddAchievementModal = ({ show, handleClose, onAchievementAdded }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [competitionName, setCompetitionName] = useState('');
    const [place, setPlace] = useState('');
    const [weightCategory, setWeightCategory] = useState(''); // Новое состояние
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/users-with-role', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !competitionName || !place || !weightCategory) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/achievements', {
                userId: selectedUser,
                competitionName,
                place,
                weightCategory // Новое поле
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
                    <Form.Group controlId="formUser">
                        <Form.Label>Выберите пользователя</Form.Label>
                        <Form.Control as="select" onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="">Выберите пользователя</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.surname} {user.name} {user.patronymic}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
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
                    <Button className='mt-2' variant="primary" type="submit">
                        Добавить достижение
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAchievementModal;
