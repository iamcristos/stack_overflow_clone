import mongoose from 'mongoose';

let url;

switch (process.env.NODE_ENV) {
  case ('test'):
    url = '';
    break;
  case ('development'):
    url = '';
    break;
  case ('staging'):
    url = '';
    break;
  case ('production'):
    url = '';
    break;
  default:
    url = 'mongodb://localhost/stack';
    break;
}

function db() {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default db;
