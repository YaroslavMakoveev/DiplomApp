const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.delete('/:id', checkAuth, checkRole('ADMIN'), reviewController.deleteReview);

module.exports = router;
