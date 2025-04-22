import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const TrialForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '+7(',
        email: '',
        age: '',
    });

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phone') {
            newValue = formatPhone(value);
        }

        setFormData({ ...formData, [name]: newValue });
    };

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '');
        const phone = digits.slice(0, 11);

        if (!phone) return '';
        let formatted = '+7(';

        if (phone.length >= 1) formatted += phone.slice(1, 4);
        if (phone.length >= 4) formatted += ')-' + phone.slice(4, 7);
        if (phone.length >= 7) formatted += '-' + phone.slice(7, 9);
        if (phone.length >= 9) formatted += '-' + phone.slice(9, 11);

        return formatted;
    };

    const validate = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const digits = formData.phone.replace(/\D/g, '');

        if (!formData.name.trim()) newErrors.name = 'Введите ФИО';
        if (digits.length !== 11 || !digits.startsWith('7')) newErrors.phone = 'Введите корректный номер';
        if (!emailPattern.test(formData.email)) newErrors.email = 'Неверный формат email';
        if (!formData.age || +formData.age < 4) newErrors.age = 'Минимальный возраст — 4 года';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axios.post('http://localhost:3000/api/trial', formData);

            // Если заявка была успешно отправлена
            setAlert({ show: true, message: 'Вы успешно записались на пробное занятие!', type: 'success' });
        } catch (err) {
            if (err.response && err.response.status === 409) {
                // Если ошибка 409 (конфликт) - заявка с таким телефоном или почтой уже существует
                setAlert({
                    show: true,
                    message: 'Вы уже записались на пробное занятие. Дождитесь ответа на своей электронной почте.',
                    type: 'warning',
                });
            } else {
                setAlert({ show: true, message: 'Ошибка при отправке формы. Попробуйте позже.', type: 'error' });
            }
        }

        setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 6000);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Запись на пробное занятие</h2>

            {alert.show && (
                <Alert variant={alert.type === 'error' ? 'danger' : alert.type === 'warning' ? 'warning' : 'success'} dismissible onClose={() => setAlert({ ...alert, show: false })}>
                    {alert.message}
                </Alert>
            )}

            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px' }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваше ФИО"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Контактный телефон</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваш номер"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Электронная почта</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите ваш email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAge" className="mb-3">
                            <Form.Label>Возраст ребенка</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите возраст ребенка"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                isInvalid={!!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Записаться на пробное занятие
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TrialForm;
