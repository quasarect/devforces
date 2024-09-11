import mongoose from 'mongoose';
import env from './env';

mongoose.connect(env.MONGODB_URI);

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'DB Connection Error: ')
// );
db.once('open', () => console.log('Connected to MongoDB'));

export { db };
