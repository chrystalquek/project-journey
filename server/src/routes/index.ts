import express from 'express';
import volunteerSchema from './volunteerSchema';
import eventRouter from './event';
import resourceRouter from './resource';
import userRouter from './user';
import volunteerRouter from './volunteer';
import opportunityRouter from './opportunity';
import signUpRouter from './signUp';
import formRouter from './form';
import commitmentApplicationRouter from './commitmentApplication';
import imageRouter from "./image";

const router = express.Router();

router.use('/event', eventRouter);
router.use('/signup', signUpRouter);
router.use('/resource', resourceRouter);
router.use('/user', userRouter);
router.use('/volunteer', volunteerRouter);
router.use('/opportunity', opportunityRouter);
router.use('/volunteer-form', volunteerSchema);
router.use('/form', formRouter);
router.use('/commitment-application', commitmentApplicationRouter);
router.use('/image', imageRouter)

export default router;
