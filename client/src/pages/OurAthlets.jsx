import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const calculateAge = (dateOfBirth) => {
    const [day, month, year] = dateOfBirth.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const getAgeSuffix = (age) => {
    const lastDigit = age % 10;
    if (lastDigit === 1 && age !== 11) {
        return 'год';
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(age)) {
        return 'года';
    } else {
        return 'лет';
    }
};

const OurAthletesPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/users-with-role');
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Container style={{ minHeight: '80vh' }}>
            <h1 className="my-4 text-center">Наши спортсмены</h1>
            <Row>
                {users.map(user => {
                    const age = calculateAge(user.dateOfBirth);
                    const ageSuffix = getAgeSuffix(age);
                    return (
                        <Col key={user.id} md={3} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:3000/uploads/${user.img}`} alt={user.name} />
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <div>
                                        <Card.Title>{user.surname} {user.name} {user.patronymic}</Card.Title>
                                        <Card.Text>
                                            <strong>Дата рождения:</strong> {user.dateOfBirth} ({age} {ageSuffix}) <br />
                                            <strong>Весовая категория:</strong> {user.weightCategory} <br />
                                            <strong>Разряд:</strong> {user.discharge} <br />
                                        </Card.Text>
                                    </div>
                                    <Button className="mt-4" style={{ width: '100%' }} variant="outline-secondary">Подробнее</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default OurAthletesPage;
