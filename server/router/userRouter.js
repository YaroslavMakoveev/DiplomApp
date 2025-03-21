const Router = require('express');
const router = new Router();
const upload = require('../multerConfig');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/registration', upload.single('img'), userController.registration);
router.post('/login', userController.login);
router.get('/auth', checkAuth, userController.check);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.put('/update-profile', checkAuth, upload.single('img'), userController.updateProfile);
router.get('/users-with-role', userController.getAllWithRole);
router.get('/search', checkAuth, userController.searchUsers); // Добавляем маршрут для поиска пользователей
router.get('/:id', checkAuth, userController.getUserById);
router.get('/achievements/:id', checkAuth, userController.getAchievementsByUserId);

module.exports = router;
