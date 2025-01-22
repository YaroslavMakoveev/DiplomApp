import React, { useState } from 'react';
import { Tabs, Tab, Button  } from 'react-bootstrap';
import TrialLessonManagement from '../components/ADMIN/TrialLessonAdmin';
import UserListAdmin from "../components/ADMIN/UserListAdmin";
import AddUserModal from "../components/ADMIN/AddUserModal";

const AdminScreen = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleUserAdded = () => {
        window.location.reload();
    };
    return (
        <>
        <h1 className='text-center mt-3 mb-3'>Панель Администратора</h1>
        <Tabs
            style={{maxWidth:"1400px", margin: '0 auto'}}
            defaultActiveKey="trialLessons"
            id="admin-tabs"
            className="mb-3 mt-4"
        >
            <Tab style={{border: '1px solid #dee2e6', margin: '-17px auto 0 auto', maxWidth: '1400px' }} eventKey="trialLessons" title="Управление заявками">
                <TrialLessonManagement />
            </Tab>
            <Tab style={{border: '1px solid #dee2e6', margin: '-17px auto 0 auto', maxWidth: '1400px' }} eventKey="anotherComponent" title="Управление спортсменами">
                <Button className='mt-3 ms-5' variant="primary" onClick={handleShow}>
                    Добавить спортсмена
                </Button>
                <AddUserModal show={showModal} handleClose={handleClose} onUserAdded={handleUserAdded} />
                <UserListAdmin />
            </Tab>
        </Tabs>
        </>
        
    );
};

export default AdminScreen;
