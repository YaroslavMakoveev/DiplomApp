const Router = require('express');
const userRouter = require('./userRouter');
const trialRouter = require('./trialLessonRouter');
const adminRouter = require('./adminRouter');
const newsRouter = require('./newsRouter');
const router = new Router();

router.use('/user', userRouter);
router.use('/trial', trialRouter);
router.use('/admin', adminRouter);
router.use('/news', newsRouter);

module.exports = router;