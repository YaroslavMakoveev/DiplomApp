const Router = require('express');
const router = new Router();
const trialLessonController = require('../controllers/trialLessonController');

router.post('/', trialLessonController.createTrialLesson);
router.get('/', trialLessonController.getTrialLessons);
router.post('/confirm', trialLessonController.confirmTrialLesson);
router.post('/cancel', trialLessonController.cancelTrialLesson);

module.exports = router;
