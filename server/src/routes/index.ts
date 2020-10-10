import express from 'express';
import resourceRouter from './resource';
import userRouter from './user';
import volunteerRouter from './volunteer';
import teamRouter from './team';

const router = express.Router();

router.use('/resource', resourceRouter);
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/', volunteerRouter);

export default router;
