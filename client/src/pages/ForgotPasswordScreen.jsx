import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsInvalid(false);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3000/api/user/forgot-password', { email });
      setSuccess(true);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsInvalid(true);
        setMessage('Пользователь с таким email не найден');
      } else {
        setMessage('Ошибка при отправке запроса');
      }
    }
  };

  return (
    <Container style={{ width: '50%', minHeight: '45vh', marginTop: '10%' }}>
      <h2 style={{ color: 'black' }} className='text-center mt-4'>Восстановление пароля</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ color: 'black' }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder='Введите ваш email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={isInvalid}
            required
          />
          <Form.Control.Feedback type="invalid">
            {message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Отправить
        </Button>
        {success && <p className="mt-3 text-success">{message}</p>}
      </Form>
    </Container>
  );
};

export default ForgotPasswordScreen;
