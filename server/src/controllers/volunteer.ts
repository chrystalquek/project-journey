import express from "express"
import { VolunteerData } from "../types"
import { addNewVolunteer } from "../services/volunteer"

const index = async (req: express.Request, res: express.Response) => {
  await addNewVolunteer(req.body as VolunteerData)
  return res.send('Volunteer data created')
}

export default {
  index
}