import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email обязателен';
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
      localStorage.setItem('role', response.data.role); // Сохраняем роль в localStorage
      navigate('/'); // Перенаправляем на главную страницу после успешного входа
      window.location.reload(); // Обновляем страницу
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors({ email: 'Неверный email' });
      } 
      if (error.response && error.response.status === 400) {
        setErrors({ password: 'Неверный пароль' });
      } 
    }
  };

  return (
    <Container className="mt-3" style={{ width: '50%' }}>
      <h2 style={{color: 'black'}} className='text-center mt-4'>Авторизация</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formLogin">
          <Form.Label style={{color: 'black'}}>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder='Введите ваш email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-2">
          <Form.Label style={{color: 'black'}}>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder='Введите ваш пароль'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3" style={{ width: '100%' }} variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default LoginScreen;
