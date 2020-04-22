import app from './server';
import db from './config/db.config';
import sendEmailQueue from './config/bull.config';
import sendEmail from './cron/notification';

const port = process.env.PORT || 3000;

app.all('*', (req, res) => res.status(404).send('invalid route url'));


db().then(() => {
  console.log('db has started');
}).catch((err) => console.error(err));


sendEmailQueue.process(async (job) => {
  await sendEmail(job.data);
});

// 5e74d39607475c41414173b7

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
