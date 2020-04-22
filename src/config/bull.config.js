import Queue from 'bull';
import secret from './secret';

const { REDIS_URL } = secret;

const sendMailQueue = new Queue('notifyAnswer', REDIS_URL);

export default sendMailQueue;
