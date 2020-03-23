import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let url;

switch (process.env.NODE_ENV) {
  case ('test'):
    url = 'mongodb://localhost/stactTest';
    break;
  case ('development'):
    url = process.env.DEVELOPMENT_DB;
    break;
  case ('staging'):
    url = process.env.STAGING_DB;
    break;
  case ('production'):
    url = process.env.DB;
    break;
  default:
    url = 'mongodb://localhost/stack';
    break;
}

function db() {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default db;
