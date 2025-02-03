import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const GroupManagement = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [trainingData, setTrainingData] = useState({
        dayOfWeek: 'Понедельник',
        startTime: '17:00',
        endTime: '18:00'
    });
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [groupMembersCount, setGroupMembersCount] = useState({});

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            fetchSchedule(selectedGroup);
        } else {
            setSchedule([]);
        }
        setTrainingData({ dayOfWeek: 'Понедельник', startTime: '17:00', endTime: '18:00' });
    }, [selectedGroup]);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/schedule/groups', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setGroups(response.data);
            const membersCount = {};
            for (const group of response.data) {
                const countResponse = await axios.get(`http://localhost:3000/api/schedule/group/${group.id}/members-count`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                membersCount[group.id] = countResponse.data.count;
            }
            setGroupMembersCount(membersCount);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/schedule/group',
                { name: groupName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setShowModal(false);
            fetchGroups();
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            await axios.delete(`http://localhost:3000/api/schedule/group/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchGroups();
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const handleAddTraining = async (groupId) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/schedule/training',
                {
                    groupId,
                    dayOfWeek: trainingData.dayOfWeek,
                    startTime: trainingData.startTime,
                    endTime: trainingData.endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setTrainingData({ dayOfWeek: 'Понедельник', startTime: '17:00', endTime: '18:00' });
            fetchSchedule(groupId);
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error('Error adding training:', error);
            }
        }
    };

    const handleDeleteTraining = async (trainingId) => {
        try {
            await axios.delete(`http://localhost:3000/api/schedule/training/${trainingId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchSchedule(selectedGroup);
        } catch (error) {
            console.error('Error deleting training:', error);
        }
    };

    const fetchSchedule = async (groupId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/schedule/group/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const sortedSchedule = response.data.sort((a, b) => {
                const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
                return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
            });
            setSchedule(sortedSchedule);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    const handleOpenMembersModal = async (groupId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/schedule/group/${groupId}/members`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSelectedGroupMembers(response.data);
            setSelectedGroup(groupId); // Убедимся, что selectedGroup установлен
            setShowMembersModal(true);
            setSearchQuery(''); // Очистка формы поиска
            setSearchResults([]); // Очистка результатов поиска
        } catch (error) {
            console.error('Error fetching group members:', error);
        }
    };

    const handleSearchUsers = async (query) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/search?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleAddUserToGroup = async (userId) => {
        try {
            await axios.post(
                'http://localhost:3000/api/schedule/group/add-user',
                { userId, groupId: selectedGroup }, // Убедимся, что groupId передается
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            handleOpenMembersModal(selectedGroup);
        } catch (error) {
            console.error('Error adding user to group:', error);
        }
    };

    const handleRemoveUserFromGroup = async (userId) => {
        try {
            await axios.post('http://localhost:3000/api/schedule/group/remove-user', {
                userId,
                groupId: selectedGroup
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            handleOpenMembersModal(selectedGroup);
        } catch (error) {
            console.error('Error removing user from group:', error);
        }
    };

    const handleCloseMembersModal = () => {
        setShowMembersModal(false);
        setSearchQuery(''); // Очистка формы поиска
        setSearchResults([]); // Очистка результатов поиска
    };

    return (
        <Container>
            <h1>Управление группами и расписанием</h1>
            <Button onClick={() => setShowModal(true)}>Создать группу</Button>
            <Row>
                {groups.map(group => (
                    <Col key={group.id} md={4}>
                        <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                            <h3 onClick={() => setSelectedGroup(group.id)}>
                                {group.name}
                                <span style={{ fontSize: '0.5em', color: 'gray', marginLeft: '10px' }}>
                                    {groupMembersCount[group.id]} чел.
                                </span>
                            </h3>
                            <Button variant="primary" onClick={() => handleOpenMembersModal(group.id)}>Состав</Button>
                            <Button variant="danger" onClick={() => handleDeleteGroup(group.id)}>Удалить группу</Button>
                            {selectedGroup === group.id && (
                                <div>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>День недели</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={trainingData.dayOfWeek}
                                                onChange={(e) => setTrainingData({ ...trainingData, dayOfWeek: e.target.value })}
                                            >
                                                <option>Понедельник</option>
                                                <option>Вторник</option>
                                                <option>Среда</option>
                                                <option>Четверг</option>
                                                <option>Пятница</option>
                                                <option>Суббота</option>
                                                <option>Воскресенье</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Время начала</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={trainingData.startTime}
                                                onChange={(e) => setTrainingData({ ...trainingData, startTime: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Время окончания</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={trainingData.endTime}
                                                onChange={(e) => setTrainingData({ ...trainingData, endTime: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Button onClick={() => handleAddTraining(group.id)}>Добавить тренировку</Button>
                                    </Form>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>День недели</th>
                                                <th>Время</th>
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedule.map(training => (
                                                <tr key={training.id}>
                                                    <td>{training.dayOfWeek}</td>
                                                    <td>{training.startTime} - {training.endTime}</td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => handleDeleteTraining(training.id)}>Удалить</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать группу</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Название группы</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCreateGroup}>Создать</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showMembersModal} onHide={handleCloseMembersModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Состав группы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Поиск спортсменов</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ФИО"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearchUsers(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <Table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map(user => (
                                <tr key={user.id}>
                                    <td>{`${user.surname} ${user.name} ${user.patronymic}`}</td>
                                    <td>
                                        <Button onClick={() => handleAddUserToGroup(user.id)}>Добавить</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Table>
                        <thead>Текущий состав
                            <tr>
                                <th>ФИО</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedGroupMembers.map(member => (
                                <tr key={member.user.id}>
                                    <td>{`${member.user.surname} ${member.user.name} ${member.user.patronymic}`}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleRemoveUserFromGroup(member.user.id)}>Исключить</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default GroupManagement;
