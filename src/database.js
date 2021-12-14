import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.databaseURI)
.then(() => console.log('DB is connected'))
.catch((error) => console.log('error conecting db', error));