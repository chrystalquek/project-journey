import express from "express"
import bodyParser from "body-parser"
import CONFIG from './config/index'

// Import routes
import volunteerRouter from './routes/volunteer'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes to app
app.use('/', volunteerRouter)

app.listen(CONFIG.port, () => {
  console.log('listening on port: ', CONFIG.port)
})

export default app