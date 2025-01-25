import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TrialLessonManagement from '../components/ADMIN/TrialLessonAdmin';
import UserListAdmin from "../components/ADMIN/UserListAdmin";
import NewsManagement from "../components/ADMIN/NewsManagement";

const AdminScreen = () => {
    return (
        <>
            <h1 className='text-center mt-3 mb-3'>Панель Администратора</h1>
            <Tabs
                style={{ maxWidth: "1400px", margin: '0 auto' }}
                defaultActiveKey="trialLessons"
                id="admin-tabs"
                className="mb-3 mt-4"
            >
                <Tab eventKey="trialLessons" title="Управление заявками">
                    <TrialLessonManagement />
                </Tab>
                <Tab eventKey="users" title="Управление спортсменами">
                    <UserListAdmin />
                </Tab>
                <Tab eventKey="news" title="Управление новостями">
                    <NewsManagement />
                </Tab>
            </Tabs>
        </>
    );
};

export default AdminScreen;