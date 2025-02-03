const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/scheduleController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/group', checkAuth, checkRole('ADMIN'), scheduleController.createGroup);
router.post('/training', checkAuth, checkRole('ADMIN'), scheduleController.addTraining);
router.post('/user-group', checkAuth, checkRole('ADMIN'), scheduleController.addUserToGroup);
router.get('/groups', checkAuth, scheduleController.getAllGroups);
router.get('/group/:groupId', checkAuth, scheduleController.getGroupSchedule);
router.get('/user/:userId', checkAuth, scheduleController.getUserSchedule);
router.delete('/training/:id', checkAuth, checkRole('ADMIN'), scheduleController.deleteTraining);
router.delete('/group/:id', checkAuth, checkRole('ADMIN'), scheduleController.deleteGroup);
router.post('/group/add-user', checkAuth, checkRole('ADMIN'), scheduleController.addUserToGroup);
router.post('/group/remove-user', checkAuth, checkRole('ADMIN'), scheduleController.removeUserFromGroup);
router.get('/group/:groupId/members', checkAuth, scheduleController.getGroupMembers);
router.get('/user/:userId/schedule', checkAuth, scheduleController.getUserSchedule);
router.get('/group/:groupId/members-count', checkAuth, checkRole('ADMIN'), scheduleController.getGroupMembersCount);

module.exports = router;
