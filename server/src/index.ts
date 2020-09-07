import express from "express"
import CONFIG from './config/index'

const app = express()

app.listen(CONFIG.port, () => {
  console.log('listening on port: ', CONFIG.port)
})
