import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const AthleteProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                const sortedAchievements = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAchievements(sortedAchievements);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
        fetchAchievements();
        setLoading(false);
    }, [id, token]);

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
                                        padding: '0',
                                        margin: '0 auto',
                                        objectFit: 'cover',
                                        marginBottom: '20px'
                                    }}
                                />
                                <h3>{user.surname} {user.name} {user.patronymic}</h3>
                            </div>
                            <div className='text-center'>
                                <strong>Дата рождения:</strong> {user.dateOfBirth} ({age} {ageSuffix}) <br />
                                <strong>Весовая категория:</strong> {user.weightCategory} <br />
                                <strong>Разряд:</strong> {user.discharge} <br />
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
                                            <li><strong>({new Date(achievement.date).toLocaleDateString()}) <br /> {achievement.competitionName} ({achievement.weightCategory} кг):</strong> {achievement.place} место <br /></li>
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
        </Container>
    );
};

export default AthleteProfile;
