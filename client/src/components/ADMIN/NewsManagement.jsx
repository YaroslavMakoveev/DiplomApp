import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const NewsManagement = () => {
    const [news, setNews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleAddNews = () => {
        setFormData({ title: '', content: '' });
        setImage(null);
        setSelectedNews(null); // Сбрасываем selectedNews
        setShowModal(true);
    };

    const handleEditNews = (newsItem) => {
        setFormData({ title: newsItem.title, content: newsItem.content });
        setSelectedNews(newsItem);
        setShowModal(true);
    };

    const handleDeleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/news/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchNews();
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (image) {
            data.append('img', image);
        }

        try {
            if (selectedNews) {
                // Редактирование существующей новости
                await axios.put(`http://localhost:3000/api/news/${selectedNews.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                // Создание новой новости
                await axios.post('http://localhost:3000/api/news', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            setShowModal(false);
            setSelectedNews(null); // Сбрасываем selectedNews после успешного создания/редактирования
            fetchNews();
        } catch (error) {
            console.error('Error submitting news:', error);
        }
    };

    const cardStyle = {
        width: '100%',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
    };

    const imgStyle = {
        objectFit: 'cover',
        height: '200px',
    };

    const cardBodyStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const cardTextStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    };

    return (
        <Container>
            <h1 className="text-center mt-3">Управление новостями</h1>
            <Button className="mb-3" onClick={handleAddNews}>Добавить новость</Button>
            <Row>
                {news.map(newsItem => (
                    <Col key={newsItem.id} md={4} className="mb-4">
                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={`http://localhost:3000/uploads/${newsItem.img}`} style={imgStyle} />
                            <Card.Body style={cardBodyStyle}>
                                <Card.Title>{newsItem.title}</Card.Title>
                                <Card.Text style={cardTextStyle}>{newsItem.content}</Card.Text>
                                <Button variant="primary" onClick={() => handleEditNews(newsItem)}>Редактировать</Button>
                                <Button variant="danger" onClick={() => handleDeleteNews(newsItem.id)}>Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNews ? 'Редактирование новости' : 'Добавление новости'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Содержание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Изображение</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Сохранить</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default NewsManagement;
