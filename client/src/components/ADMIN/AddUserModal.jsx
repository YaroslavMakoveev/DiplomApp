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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
            const response = await axios.post('http://localhost:3000/api/user/registration', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Пользователь успешно зарегистрирован!');
            onUserAdded();
            handleClose();
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
                        <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formPatronymic">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formWeightCategory">
                        <Form.Label>Весовая категория</Form.Label>
                        <Form.Control type="text" name="weightCategory" value={formData.weightCategory} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formDischarge">
                        <Form.Label>Разряд</Form.Label>
                        <Form.Control type="text" name="discharge" value={formData.discharge} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formDateOdBirth">
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required isInvalid={errors.email} />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required isInvalid={errors.phone} />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formImage">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Зарегистрировать
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
