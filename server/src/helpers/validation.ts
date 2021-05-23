import { body } from 'express-validator';

// TODO: remove / add as necessary
const volunteeringSessionsCount = body('volunteeringSessionsCount').isInt();
const workshopsCount = body('workshopsCount').isInt();
const hangoutsCount = body('hangoutsCount').isInt();
const pastEventIds = body('pastEventIds').isArray();
const sessionsPerMonth = body('sessionsPerMonth').isInt().optional();
const sessionPreference = body('sessionPreference').isString().optional();
