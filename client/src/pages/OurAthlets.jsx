import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
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
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/users-with-role');
                setUsers(response.data);
                setFilteredUsers(response.data); // Инициализация отфильтрованных пользователей
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, users]);

    const filterUsers = () => {
        if (searchQuery) {
            const filtered = users.filter(user =>
                `${user.name} ${user.surname} ${user.patronymic}`.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Container style={{ minHeight: '80vh' }}>
            <h1 className="my-4 text-center">Наши спортсмены</h1>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Поиск по ФИО"
                    aria-label="Поиск по ФИО"
                    aria-describedby="basic-addon2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Поиск
                </Button>
            </InputGroup>
            <Row>
                {filteredUsers.map(user => {
                    const age = calculateAge(user.dateOfBirth);
                    const ageSuffix = getAgeSuffix(age);
                    return (
                        <Col key={user.id} md={4} className="mb-4">
                            <Card style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
                                <Card.Img
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    variant="top"
                                    src={`http://localhost:3000/uploads/${user.img}`}
                                    alt={user.name}
                                />
                                <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
