import * as Sentry from '@sentry/node';
import App from './app';
import ScriptsController from './controllers/scripts';
import StatusController from './controllers/status';
import UploadController from './controllers/upload';

import { AppProcess } from './types';

Sentry.init({
  dsn:
    'https://34da551405b74b359ec7e3e5a0855337@o202486.ingest.sentry.io/5200749',
});

const currentProcesses: AppProcess[] = [];

const app = new App(
  [
    new ScriptsController(),
    new StatusController(currentProcesses),
    new UploadController(currentProcesses),
  ],
  process.env.PORT,
);

app.listen();
