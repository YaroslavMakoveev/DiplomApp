import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import UserCard from '../UserCard';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUser, setEditedUser] = useState({
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        phone: '',
        role: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/admin/users/${selectedUser.id}`, editedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowEditModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Container className='mt-3'>
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
                {filteredUsers.map(user => (
                    <Col key={user.id} md={4} style={{ marginBottom: '20px' }}>
                        <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
                    </Col>
                ))}
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.surname}
                                onChange={(e) => setEditedUser({ ...editedUser, surname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Patronymic</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.patronymic}
                                onChange={(e) => setEditedUser({ ...editedUser, patronymic: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedUser.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={updateUser}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserList;
