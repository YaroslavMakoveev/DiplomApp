import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterADMIN = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER'
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:3000/api/user/registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Пользователь успешно зарегистрирован!');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.field) {
                    setErrors({ [err.response.data.field]: err.response.data.message });
                } else {
                    setErrors({ server: err.response.data.message });
                }
            } else {
                setErrors({ server: 'Ошибка сервера. Пожалуйста, попробуйте снова.' });
            }
        }
    };

    return (
        <Container>
            <h2 className='mt-4 text-center'>Регистрация нового спортсмена</h2>
            {errors.server && <Alert variant="danger">{errors.server}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto 20px auto' }}>
                <Form.Group controlId="formName">
                    <Form.Label className='mt-2'>Имя</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label className='mt-2'>Фамилия</Form.Label>
                    <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formPatronymic">
                    <Form.Label className='mt-2'>Отчество</Form.Label>
                    <Form.Control type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className='mt-2'>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required isInvalid={errors.email} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPhone">
                    <Form.Label className='mt-2'>Телефон</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required isInvalid={errors.phone} />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className='mt-2'>Пароль</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Button className='mt-2' variant="primary" type="submit">
                    Зарегистрировать
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterADMIN;
