import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/reset-password', { token, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Ошибка при сбросе пароля');
    }
  };

  return (
    <Container className="mt-3" style={{ width: '50%' }}>
      <h2 style={{ color: 'black' }} className='text-center mt-4'>Сброс пароля</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword">
          <Form.Label style={{ color: 'black' }}>Новый пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder='Введите новый пароль'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Сбросить пароль
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </Container>
  );
};

export default ResetPasswordScreen;