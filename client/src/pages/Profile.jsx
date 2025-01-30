import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';

function Profile() {
    const [user, setUser] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        img: null
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/user/auth', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setFormData({
                    name: response.data.user.name,
                    surname: response.data.user.surname,
                    patronymic: response.data.user.patronymic,
                    img: null
                });

                const achievementsResponse = await axios.get(`http://localhost:3000/api/achievements/${response.data.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAchievements(achievementsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            img: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.put('http://localhost:3000/api/user/update-profile', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setUser(response.data.user);
            window.location.reload();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating user data:', error);
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

    if (!user) {
        return <div>Loading...</div>;
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
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        margin: '0 auto',
                                        objectFit: 'cover',
                                        marginBottom: '20px'
                                    }}
                                />
                                <h3>{user.surname} {user.name} {user.patronymic}</h3>
                                <div className='text-center'>
                                    <strong>Дата рождения:</strong> {user.dateOfBirth} ({age} {ageSuffix}) <br />
                                    <strong>Весовая категория:</strong> {user.weightCategory} <br />
                                    <strong>Разряд:</strong> {user.discharge} <br />
                                </div>
                                <Button className='mt-2' variant="primary" onClick={handleEditProfile}>
                                    Изменить данные
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                <Card>
                        <Card.Body>
                            <div>
                                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Достижения</h2>
                                {achievements.length > 0 ? (
                                    achievements.map(achievement => (
                                        <ul key={achievement.id}>
                                            <li><strong>{achievement.competitionName} ({achievement.weightCategory} кг):</strong> {achievement.place} место <br /></li>
                                        </ul>
                                    ))
                                ) : (
                                    <div className='text-center'>Достижений пока нет</div>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Модальное окно для изменения данных */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить данные</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPatronymic">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                name="patronymic"
                                value={formData.patronymic}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImg">
                            <Form.Label>Фото</Form.Label>
                            <Form.Control
                                type="file"
                                name="img"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button className='mt-2' variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Profile;
