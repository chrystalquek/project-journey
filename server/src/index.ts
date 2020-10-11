import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import CONFIG from './config/index';
import db from './loaders/connection';

// Import routes
import router from './routes';

// TODO: @akhil - remove this code before going on prod or enable it only on dev
import testRoute from './routes/test';

// load db -> find better way instead of this
db;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Test route for deployment
app.use('/test', testRoute)
// Add routes to app
app.use('/', router);

app.listen(CONFIG.port, () => {
  console.log('listening on port: ', CONFIG.port);
});

export default app;
