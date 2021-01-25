import mongoose from 'mongoose';

// Production uses one DB while staging and development share a DB
const CONNECTION_STRING = process.env.NODE_ENV === 'production' ? 'mongodb+srv://user:user@cluster0.w711i.mongodb.net/user?retryWrites=true&w=majority' : 'mongodb+srv://user:user@cluster0.8ap9j.gcp.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('MongoDB connection established');
});

export default db;
