import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import CONFIG from './config/index';
import db from './loaders/connection';

// Import routes
import router from './routes';

// TODO: @akhil - remove this code before going on prod or enable it only on dev
import testRoute from './routes/test';
import config from './config/index';

// The dotenv file should be parsed before any imports requiring process.env
// tslint:disable-next-line:no-var-requires
const result = require('dotenv').config();

if (result.error) {
  throw new Error('Error parsing dotenv');
}

require('dotenv').config();

// load db -> find better way instead of this
db;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test route for deployment
app.use('/test', testRoute);
// Add routes to app
app.use('/', router);

if (config.env == 'development') {
  app.use(cors());
}

app.listen(CONFIG.port, () => {
  console.log('listening on port: ', CONFIG.port);
});

export default app;
