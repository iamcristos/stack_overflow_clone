import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import userRoute from './route/user.route';
import questionRoute from './route/question.route';
import answerRoute from './route/answer.route';

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', [userRoute, questionRoute, answerRoute]);
// app.use('/', questionRoute);


export default app;
