import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, '');
  let formatted = digits.startsWith('8') ? digits.slice(1) : digits;
  formatted = formatted.startsWith('7') ? formatted.slice(1) : formatted;

  if (formatted.length === 0) return '+7';
  if (formatted.length <= 3) return `+7(${formatted}`;
  if (formatted.length <= 6) return `+7(${formatted.slice(0, 3)})-${formatted.slice(3)}`;
  if (formatted.length <= 8) return `+7(${formatted.slice(0, 3)})-${formatted.slice(3, 6)}-${formatted.slice(6)}`;
  return `+7(${formatted.slice(0, 3)})-${formatted.slice(3, 6)}-${formatted.slice(6, 8)}-${formatted.slice(8, 10)}`;
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authMethod, setAuthMethod] = useState('email');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (authMethod === 'email' && !email) {
      newErrors.email = 'Email обязателен';
    }
    if (authMethod === 'phone' && !phone) {
      newErrors.phone = 'Номер телефона обязателен';
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
        email: authMethod === 'email' ? email : '',
        phone: authMethod === 'phone' ? phone.replace(/\D/g, '') : '',
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors({
          email: 'Неверный email или номер телефона',
          phone: 'Неверный email или номер телефона',
        });
      }
      if (error.response && error.response.status === 403) {
        setErrors({ password: 'Неверный пароль' });
      }
    }
  };

  return (
    <Container className="mt-3" style={{ width: '50%', minHeight: '70vh' }}>
      <h2 style={{ color: 'black', marginTop: '20%' }} className='text-center'>Авторизация</h2>
      <Tabs
        defaultActiveKey="email"
        id="auth-method-tabs"
        className="mb-3 mt-4"
        fill
        onSelect={(k) => setAuthMethod(k)}
      >
        <Tab eventKey="email" title="Email">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label style={{ color: 'black' }}>Email</Form.Label>
              <Form.Control
                type="email"
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
              <Form.Label style={{ color: 'black' }}>Пароль</Form.Label>
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
            <Button className="mt-3" style={{ width: '100%' }} variant="link" onClick={() => navigate('/forgot-password')}>
              Забыли пароль?
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="phone" title="Номер телефона">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formPhone">
              <Form.Label style={{ color: 'black' }}>Номер телефона</Form.Label>
              <Form.Control
                type="text"
                placeholder='+7(ХХХ)-ХХХ-ХХ-ХХ'
                name="phone"
                value={phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setPhone(formatted);
                }}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-2">
              <Form.Label style={{ color: 'black' }}>Пароль</Form.Label>
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
            <Button className="mt-3" style={{ width: '100%' }} variant="link" onClick={() => navigate('/forgot-password')}>
              Забыли пароль?
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default LoginScreen;
