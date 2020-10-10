import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';

// The dotenv file should be parsed before any imports requiring process.env
// tslint:disable-next-line:no-var-requires
const result = require('dotenv').config();
if (result.error) {
  throw new Error("Error parsing dotenv");
}

import CONFIG from './config/index';
import db from './loaders/connection';

import console from 'console';

// Import routes
import router from './routes';

// load db -> find better way instead of this
db;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Add routes to app
app.use('/', router);

app.listen(CONFIG.port, () => {
  console.log(`App listening on port ${CONFIG.port}`);
});

export default app;
