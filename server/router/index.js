const Router = require('express');
const userRouter = require('./userRouter');
const trialRouter = require('./trialLessonRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/trial', trialRouter)

module.exports = router;