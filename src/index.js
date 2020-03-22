import app from './server';
import db from './config/db.config';
import cron from './cron';

const port = process.env.PORT || 3000;

app.all('*', (req, res) => res.status(404).send('invalid route url'));


db().then(() => {
  console.log('db has started');
}).catch((err) => console.error(err));

cron();

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
