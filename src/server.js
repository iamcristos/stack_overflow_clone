import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import userRoute from './route/user.route';
import questionRoute from './route/question.route';
import answerRoute from './route/answer.route';

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', [userRoute, questionRoute, answerRoute]);


export default app;
