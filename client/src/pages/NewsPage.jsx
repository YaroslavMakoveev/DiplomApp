import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        filterNews();
    }, [searchQuery, news]);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/news');
            setNews(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterNews = () => {
        if (searchQuery) {
            const filtered = news.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                new Date(item.publishedDate).toLocaleDateString().includes(searchQuery)
            );
            setFilteredNews(filtered);
        } else {
            setFilteredNews(news);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div style={{ minHeight: '90vh' }}>
            <Container>
                <h1 className="my-4 text-center">Новости</h1>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Поиск по названию или дате публикации"
                        aria-label="Поиск по названию или дате публикации"
                        aria-describedby="basic-addon2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Поиск
                    </Button>
                </InputGroup>
                
                    {filteredNews.map(item => (
                        <Row className="my-4 school_cards" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <React.Fragment key={item.id}>
                                <Col md={6} className="d-flex justify-content-center align-items-center">
                                    <div style={{ textAlign: 'left', padding: '20px' }}>
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                        <p><strong>Дата публикации:</strong> {new Date(item.publishedDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                    </div>
                                </Col>
                                {item.img && (
                                    <Col md={6} className="d-flex justify-content-center align-items-center">
                                        <img
                                            src={`http://localhost:3000/uploads/${item.img}`}
                                            alt={item.title}
                                            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                                        />
                                    </Col>
                                )}
                        </React.Fragment>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default NewsPage;
