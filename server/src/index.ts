import app from './app';
import env from '../config/env';
import '../config/db';

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});

process.on('uncaughtException', (error: Error) => {
  console.log('Uncaught Exception: ', error);
  // process.exit(1)
});
