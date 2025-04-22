import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

import AdminCheck from '../middleware/AdminCheck'

function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate('');

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/user/auth', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAuthenticated(true);
                setUser(response.data.user);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        setIsAuthenticated(false);
        setUser(null);
        navigate('/')
        window.location.reload();
    };

    return (
        <Navbar style={{ display: 'flex', alignItems: 'center' }} collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg className='me-2' width="61" height="41" viewBox="0 0 61 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.4937 11.5548L11.7325 23.2039C11.042 26.1173 8.09591 28.0352 5.15229 27.4877C2.20867 26.9402 0.382197 24.1346 1.07275 21.2212L4.82445 5.39297C4.95502 4.84211 5.16623 4.32684 5.44281 3.8571C6.24809 1.6743 8.34704 0.117828 10.8095 0.117828H54.7049C57.8631 0.117828 60.4234 2.67808 60.4234 5.83632C60.4234 8.99455 57.8631 11.5548 54.7049 11.5548H14.4937Z" fill="#2C7BD8" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M47.3319 28.6808L50.093 17.0318C50.7836 14.1184 53.7297 12.2005 56.6733 12.748C59.6169 13.2955 61.4434 16.1011 60.7528 19.0145L57.0011 34.8427C56.8706 35.3936 56.6593 35.9088 56.3828 36.3786C55.5775 38.5614 53.4785 40.1178 51.0161 40.1178H7.12068C3.96245 40.1178 1.4022 37.5576 1.4022 34.3993C1.4022 31.2411 3.96245 28.6808 7.12069 28.6808H47.3319Z" fill="#B03C2A" />
                        <path d="M27.3388 21.9026C27.3388 24.579 24.8687 26.8487 21.6907 26.8487C18.5127 26.8487 16.0427 24.579 16.0427 21.9026C16.0427 19.2261 18.5127 16.9564 21.6907 16.9564C24.8687 16.9564 27.3388 19.2261 27.3388 21.9026Z" stroke="#2C7EDE" />
                        <path d="M47.0125 18.0902C47.0125 20.7667 44.5425 23.0364 41.3645 23.0364C38.1864 23.0364 35.7164 20.7667 35.7164 18.0902C35.7164 15.4138 38.1864 13.144 41.3645 13.144C44.5425 13.144 47.0125 15.4138 47.0125 18.0902Z" stroke="#C17E7B" />
                    </svg>
                    Ставровская Школа Самбо
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Nav className="me-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/news">Новости</Nav.Link>
                        <Nav.Link href="/our-athlets">Наши спортсмены</Nav.Link>
                    </Nav>
                    <Nav style={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Nav.Link href='/profile' style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                    <img src={`http://localhost:3000/uploads/${user.img}`} style={{ width: '40px', height:'40px', objectFit: 'cover', borderRadius: '50%', marginRight: '7px' }} alt="User" />
                                    {user.surname} {user.name} {user.patronymic}
                                </Nav.Link>
                                <AdminCheck>
                                    <Button variant='warning' href='/admin' style={{ height: '40px' }}>
                                        Админ
                                    </Button>
                                </AdminCheck>
                                <Button variant="danger" onClick={handleLogout} style={{ marginLeft: '10px', height: '40px' }}>
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button className='me-2' href='/login'>Авторизация</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
