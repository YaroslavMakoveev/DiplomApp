const Router = require('express');
const router = new Router();
const upload = require('../multerConfig');

const userController = require('../controllers/userController');
const checkAuth = require('../middleware/authMiddleware')

router.post('/registration', upload.single('img'), userController.registration);
router.post('/login', userController.login);
router.get('/auth', checkAuth, userController.check);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);


module.exports = router;