import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import TrialLessonManagement from '../components/ADMIN/TrialLessonAdmin'; // Предполагается, что этот компонент находится в той же директории

const AdminScreen = () => {
    return (
        <Tabs
            defaultActiveKey="trialLessons"
            id="admin-tabs"
            className="mb-3 mt-5"
        >
            <Tab eventKey="trialLessons" title="Управление заявками">
                <TrialLessonManagement />
            </Tab>
            <Tab eventKey="anotherComponent" title="Другой компонент">
            </Tab>
            {/* Добавьте другие вкладки по мере необходимости */}
        </Tabs>
    );
};

export default AdminScreen;
