import express from 'express'
import commitmentApplicationController from '../controllers/commitmentApplication'

const router = express.Router()

router.post('/', commitmentApplicationController.createCommitmentApplication);

router.get('/', commitmentApplicationController.readCommitmentApplications);

export default router