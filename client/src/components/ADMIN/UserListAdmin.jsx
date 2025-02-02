import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import UserCard from '../UserCard';
import { useNavigate } from 'react-router-dom';

const UserListAdmin = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
                        <UserCard user={user} onEdit={() => handleEdit(user.id)} onDelete={() => handleDelete(user.id)} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserListAdmin;
