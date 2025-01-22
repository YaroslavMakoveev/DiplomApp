const Router = require('express');
const userRouter = require('./userRouter');
const trialRouter = require('./trialLessonRouter');
const adminRouter = require('./adminRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/trial', trialRouter);
router.use('/admin', adminRouter);

module.exports = router;
