import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import CONFIG from './config/index';
import db from './loaders/connection';

// Import routes
import router from './routes';

require('dotenv').config();

// load db -> find better way instead of this
db;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Add routes to app
app.use('/', router);

app.listen(CONFIG.port, () => {
  console.log('listening on port: ', CONFIG.port);
});

export default app;
