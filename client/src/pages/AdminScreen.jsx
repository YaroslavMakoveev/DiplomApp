import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import TrialLessonManagement from '../components/ADMIN/TrialLessonAdmin';
import RegisterADMIN from "../components/ADMIN/RegisterADMIN";

const AdminScreen = () => {
    return (
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
                <RegisterADMIN />
            </Tab>
        </Tabs>
    );
};

export default AdminScreen;
