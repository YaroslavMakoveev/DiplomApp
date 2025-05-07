import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddUserModal = ({ show, handleClose, onUserAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        weightCategory: '',
        discharge: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER'
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Валидация для полей ФИО — только кириллица, пробел, дефис, апостроф
        if (['name', 'surname', 'patronymic'].includes(name)) {
            const cyrillicOnly = value.replace(/[^А-Яа-яЁё\s\-']/g, '');
            if (value !== cyrillicOnly) {
                setErrors(prev => ({ ...prev, [name]: 'Разрешена только кириллица' }));
            } else {
                setErrors(prev => ({ ...prev, [name]: null }));
            }
            setFormData({ ...formData, [name]: cyrillicOnly });
            return;
        }

        // Форматирование телефона
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 11);
            let formatted = '+7';
            if (digits.length > 1) formatted += `(${digits.slice(1, 4)}`;
            if (digits.length >= 4) formatted += `)-${digits.slice(4, 7)}`;
            if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
            if (digits.length >= 9) formatted += `-${digits.slice(9, 11)}`;
            setFormData({ ...formData, phone: formatted });
            return;
        }

        // Форматирование даты рождения
        if (name === 'dateOfBirth') {
            const digits = value.replace(/\D/g, '').slice(0, 8);
            let formatted = '';
            if (digits.length > 0) formatted += digits.slice(0, 2);
            if (digits.length >= 3) formatted += `.${digits.slice(2, 4)}`;
            if (digits.length >= 5) formatted += `.${digits.slice(4, 8)}`;
            setFormData({ ...formData, dateOfBirth: formatted });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess(null);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (image) {
            data.append('img', image);
        }

        try {
            await axios.post('http://localhost:3000/api/user/registration', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Пользователь успешно зарегистрирован!');
            onUserAdded();
            handleClose();
        } catch (err) {
            if (err.response?.data?.message) {
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация нового спортсмена</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errors.server && <Alert variant="danger">{errors.server}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSurname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            isInvalid={!!errors.surname}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPatronymic">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text"
                            name="patronymic"
                            value={formData.patronymic}
                            onChange={handleChange}
                            isInvalid={!!errors.patronymic}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.patronymic}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formWeightCategory">
                        <Form.Label>Весовая категория</Form.Label>
                        <Form.Control
                            type="text"
                            name="weightCategory"
                            value={formData.weightCategory}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDischarge">
                        <Form.Label>Разряд</Form.Label>
                        <Form.Control
                            type="text"
                            name="discharge"
                            value={formData.discharge}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control
                            type="text"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            placeholder="ДД.ММ.ГГГГ"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+7(XXX)-XXX-XX-XX"
                            required
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formImage">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>

                    <Button className='mt-2' variant="primary" type="submit">
                        Зарегистрировать
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
