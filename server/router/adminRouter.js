const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/users', checkAuth, checkRole('ADMIN'), adminController.getUsers);
router.delete('/users/:id', checkAuth, checkRole('ADMIN'), adminController.deleteUser);
router.put('/users/:id', checkAuth, checkRole('ADMIN'), adminController.updateUser);

module.exports = router;
