import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Ошибка при отправке запроса');
    }
  };

  return (
    <Container className="mt-3" style={{ width: '50%' }}>
      <h2 style={{ color: 'black' }} className='text-center mt-4'>Восстановление пароля</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ color: 'black' }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder='Введите ваш email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </Container>
  );
};

export default ForgotPasswordScreen;
