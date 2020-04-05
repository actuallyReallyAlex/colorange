/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import App from './app';
import StatusController from './controllers/status';
import UploadController from './controllers/upload';

import { AppProcess } from './types';

const currentProcesses: AppProcess[] = [];

const app = new App(
  [
    new StatusController(currentProcesses),
    new UploadController(currentProcesses),
  ],
  process.env.PORT || 3000,
);

app.listen();
