import dotenv from 'dotenv';

dotenv.config();

const secret = {
  JWT_SECRET: process.env.JWT_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
};

export default secret;
