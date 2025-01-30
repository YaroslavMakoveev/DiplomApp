import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddAchievementModal from '../ADMIN/AddAchievementModal';

const EditUserAdminScreen = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAchievementModal, setShowAchievementModal] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: '',
        surname: '',
        patronymic: '',
        weightCategory: '',
        discharge: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER'
    });
    const [image, setImage] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setEditedUser(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAchievements = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/achievements/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAchievements(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
        fetchAchievements();
        setLoading(false);
    }, [id, token]);

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleShowAchievementModal = () => {
        setShowAchievementModal(true);
    };

    const handleCloseAchievementModal = () => {
        setShowAchievementModal(false);
    };

    const handleAchievementAdded = () => {
        window.location.reload();
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const updateUser = async () => {
        try {
            const data = new FormData();
            for (const key in editedUser) {
                data.append(key, editedUser[key]);
            }
            if (image) {
                data.append('img', image);
            }

            await axios.put(`http://localhost:3000/api/admin/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setShowEditModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteAchievement = async (achievementId) => {
        try {
            await axios.delete(`http://localhost:3000/api/achievements/${achievementId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAchievements(achievements.filter(achievement => achievement.id !== achievementId));
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth.split('.').reverse().join('-'));
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    const age = calculateAge(user.dateOfBirth);
    const ageSuffix = age === 1 ? 'год' : age >= 2 && age <= 4 ? 'года' : 'лет';

    return (
        <Container style={{ minHeight: '70vh' }}>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <div style={{ textAlign: 'center' }}>
                                <img
                                    src={`http://localhost:3000/uploads/${user.img}`}
                                    alt="User Avatar"
                                    style={{
                                        width: '500px',
                                        height: '500px',
                                        borderRadius: '50%',
                                        margin: '0 auto',
                                        objectFit: 'cover',
                                        marginBottom: '20px'
                                    }}
                                />
                                <h3>{user.surname} {user.name} {user.patronymic}</h3>
                            </div>
                            <div className='text-center'>
                                <strong>Дата рождения:</strong> {user.dateOfBirth} ({age} {ageSuffix})<br />
                                <strong>Весовая категория:</strong> {user.weightCategory}<br />
                                <strong>Разряд:</strong> {user.discharge}<br />
                                <Button className='mt-3' variant="primary" onClick={handleEdit}>
                                    Редактировать
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <div>
                                <h2 style={{ textAlign: 'center' }}>Достижения</h2>
                                {achievements.length > 0 ? (
                                    achievements.map(achievement => (
                                        <div className='d-flex align-items-center' key={achievement.id}>
                                           <p className='mt-4'><strong  >{achievement.competitionName} ({achievement.weightCategory} кг):</strong> {achievement.place} место </p>
                                            <Button className='ms-2 mt-2' variant="danger" onClick={() => handleDeleteAchievement(achievement.id)}>
                                                Удалить
                                            </Button> 
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center'>Достижений пока нет</div>
                                )}
                                <Button variant="primary" onClick={handleShowAchievementModal}>
                                    Добавить достижение
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.surname}
                                onChange={(e) => setEditedUser({ ...editedUser, surname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.patronymic}
                                onChange={(e) => setEditedUser({ ...editedUser, patronymic: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Весовая категория</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.weightCategory}
                                onChange={(e) => setEditedUser({ ...editedUser, weightCategory: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Разряд</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.discharge}
                                onChange={(e) => setEditedUser({ ...editedUser, discharge: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.dateOfBirth}
                                onChange={(e) => setEditedUser({ ...editedUser, dateOfBirth: e.target.value })}
                            />
                            <Form.Text className="text-muted">
                                {`(${calculateAge(editedUser.dateOfBirth)} ${calculateAge(editedUser.dateOfBirth) === 1 ? 'год' : calculateAge(editedUser.dateOfBirth) >= 2 && calculateAge(editedUser.dateOfBirth) <= 4 ? 'года' : 'лет'})`}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Адрес электронной почты</Form.Label>
                            <Form.Control
                                type="email"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Изображение</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Отменить</Button>
                    <Button variant="primary" onClick={updateUser}>Сохранить изменения</Button>
                </Modal.Footer>
            </Modal>

            <AddAchievementModal show={showAchievementModal} handleClose={handleCloseAchievementModal} onAchievementAdded={handleAchievementAdded} />
        </Container>
    );
};

export default EditUserAdminScreen;
