const Router = require('express');
const router = new Router();

const trialLessonController = require('../controllers/trialLessonController');

router.post('/', trialLessonController.createTrialLesson);

module.exports = router;