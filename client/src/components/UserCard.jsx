import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <Card style={{ width: '25rem', marginBottom: '20px' }}>
            <Card.Img
                style={{ width: '100%', height: '20vw', margin: '0 auto', objectFit: 'cover' }}
                variant="top"
                src={`http://localhost:3000/uploads/${user.img}`}
            />
            <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {`${user.name} ${user.surname} ${user.patronymic}`}
                </Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {user.email}<br />
                    <strong>Phone:</strong> {user.phone}<br />
                </Card.Text>
                <Button className='me-2' variant="primary" onClick={() => onEdit(user)}>Редактировать</Button>
                <Button variant="danger" onClick={() => onDelete(user.id)}>Удалить</Button>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
