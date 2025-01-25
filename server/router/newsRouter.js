const Router = require('express');
const router = new Router();
const upload = require('../multerConfig');
const newsController = require('../controllers/newsController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkAuth, checkRole('ADMIN'), upload.single('img'), newsController.createNews);
router.get('/', newsController.getNews);
router.put('/:id', checkAuth, checkRole('ADMIN'), upload.single('img'), newsController.updateNews);
router.delete('/:id', checkAuth, checkRole('ADMIN'), newsController.deleteNews);

module.exports = router;