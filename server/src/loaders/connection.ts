import mongoose from 'mongoose'
const mongoDbConnectionString = "mongodb+srv://user:user@cluster0.8ap9j.gcp.mongodb.net/user?retryWrites=true&w=majority"
mongoose.connect(mongoDbConnectionString, { 
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connectione error'))

export default db