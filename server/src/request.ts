import express from 'express';
import { VolunteerData } from './types';

declare global {
    namespace Express {
        interface Request {
            user: VolunteerData
        }
    }
}
