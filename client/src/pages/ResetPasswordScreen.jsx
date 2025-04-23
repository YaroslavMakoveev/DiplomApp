import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!password) {
      setPasswordError('Введите пароль');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Подтвердите пароль');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/api/user/reset-password', { 
        token, 
        password 
      });
      setMessage(response.data.message);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка при сбросе пароля');
    }
  };

  return (
    <Container style={{ width: '50%', minHeight: '65vh', marginTop: '15%' }}>
      <h2 style={{ color: 'black' }} className='text-center mt-4'>Сброс пароля</h2>
      
      {success && (
        <Alert variant="success" className="mt-3">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label style={{ color: 'black' }}>Новый пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder='Введите новый пароль'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError}
            required
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label style={{ color: 'black' }}>Подтвердите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder='Повторите пароль'
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={!!confirmPasswordError}
            required
          />
          <Form.Control.Feedback type="invalid">
            {confirmPasswordError}
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Сбросить пароль
        </Button>

        {message && !success && (
          <p className="mt-3 text-danger">{message}</p>
        )}
      </Form>
    </Container>
  );
};

export default ResetPasswordScreen;