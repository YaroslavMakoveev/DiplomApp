const Router = require('express');
const achievementController = require('../controllers/achievementController');
const checkAuth = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', checkAuth, achievementController.createAchievement);
router.get('/:userId', checkAuth, achievementController.getAchievementsByUser);
router.delete('/:id', checkAuth, achievementController.deleteAchievement); // Новый маршрут для удаления достижения

module.exports = router;
