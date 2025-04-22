import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import UserCard from '../UserCard';
import { useNavigate } from 'react-router-dom';

const UserListAdmin = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

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

    const handleEdit = (userId) => {
        navigate(`/admin/edit-user/${userId}`);
    };

    const confirmDelete = (userId) => {
        setUserToDelete(userId);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!userToDelete) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/admin/users/${userToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== userToDelete));
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setShowConfirmModal(false);
            setUserToDelete(null);
        }
    };

    return (
        <Container className='mt-3' style={{minHeight: '60vh'}}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Поиск по ФИО"
                    aria-label="Поиск по ФИО"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary">Поиск</Button>
            </InputGroup>
            <Row>
                {filteredUsers.map(user => (
                    <Col key={user.id} md={4} style={{ marginBottom: '20px' }}>
                        <UserCard
                            user={user}
                            onEdit={() => handleEdit(user.id)}
                            onDelete={() => confirmDelete(user.id)}
                        />
                    </Col>
                ))}
            </Row>

            {/* Модальное окно подтверждения */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите удаление</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить пользователя?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirmed}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserListAdmin;
