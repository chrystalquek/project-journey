import express from "express"
import volunteerController from '../controllers/volunteer'

const router = express.Router()

router.get('/', volunteerController.index)
router.post('/', volunteerController.validate('createVolunteer'), volunteerController.index)

export default router