import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import db from './config/db.config';
import userRoute from './route/user.route';
import questionRoute from './route/question.route';

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', [userRoute, questionRoute]);
// app.use('/', questionRoute);

const port = process.env.PORT || 3000;

db().then(() => {
  console.log('db has started');
}).catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
