import express from 'express';
import volunteerSchema from './volunteerSchema';
import eventRouter from './event';
import resourceRouter from './resource';
import userRouter from './user';
import volunteerRouter from './volunteer';

const router = express.Router();

router.use('/event', eventRouter);
router.use('/resource', resourceRouter);
router.use('/user', userRouter);
router.use('/volunteer', volunteerRouter);
router.use('/volunteer-form', volunteerSchema);

export default router;
