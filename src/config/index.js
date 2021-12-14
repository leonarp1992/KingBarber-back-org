import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  databaseURI: process.env.DATABASE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};