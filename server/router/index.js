const Router = require('express');
const userRouter = require('./userRouter');
const trialRouter = require('./trialLessonRouter');
const adminRouter = require('./adminRouter');
const newsRouter = require('./newsRouter');
const achievementRouter = require('./achievementRouter');
const router = new Router();

router.use('/user', userRouter);
router.use('/trial', trialRouter);
router.use('/admin', adminRouter);
router.use('/news', newsRouter);
router.use('/achievements', achievementRouter);

module.exports = router;