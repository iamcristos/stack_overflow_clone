import app from './server';
import db from './config/db.config';

const port = process.env.PORT || 3000;

db().then(() => {
  console.log('db has started');
}).catch((err) => console.error(err));


app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
