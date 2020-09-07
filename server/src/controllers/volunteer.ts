import express from "express"

const index = (req: express.Request, res: express.Response) => {
  res.send('NOT Implemented: volunteer index')
}

export default {
  index
}