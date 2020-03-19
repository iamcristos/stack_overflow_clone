import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import db from './config/db.config';

const app = express();

app.use(helmet);
app.use(logger('dev'));

const port = process.env.PORT || 3000;

db().then(() => {
  console.log('db has started');
}).catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
