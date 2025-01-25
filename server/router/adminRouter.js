const Router = require('express');
const router = new Router();
const upload = require('../multerConfig');

const adminController = require('../controllers/adminController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/users', checkAuth, checkRole('ADMIN'), adminController.getUsers);
router.delete('/users/:id', checkAuth, checkRole('ADMIN'), adminController.deleteUser);
router.put('/users/:id', checkAuth, checkRole('ADMIN'), upload.single('img'), adminController.updateUser);

module.exports = router;
