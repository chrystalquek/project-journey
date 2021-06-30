import mongoose, { Connection } from "mongoose";

// Production uses one DB while staging and development share a DB
const DATABASE_URI =
  process.env.ENV === "production"
    ? "mongodb+srv://user:user@cluster0.w711i.mongodb.net/user?retryWrites=true&w=majority"
    : "mongodb+srv://user:user@cluster0.8ap9j.gcp.mongodb.net/user?retryWrites=true&w=majority";

// Open a connection to the MongoDB database specified by `CONNECTION_STRING`
mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Get notified upon success or failure of database connection
const db: Connection = mongoose.connection;
db.on("error", () => {
  throw Error("Can't connect to database");
});

db.once("open", () => {
  console.info("Database connection established");
});

export default db;
