/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import ttyStream from 'tty';
import App from './app';
import StatusController from './controllers/status';
import UploadController from './controllers/upload';

import { AppProcess } from './types';

if (!process.stderr.isTTY) {
  const tty = ttyStream.WriteStream.prototype;
  Object.keys(tty).forEach((key) => {
    process.stderr[key] = tty[key];
  });
  process.stderr.columns = 80;
}

const currentProcesses: AppProcess[] = [];

const app = new App(
  [
    new StatusController(currentProcesses),
    new UploadController(currentProcesses),
  ],
  process.env.PORT,
);

app.listen();
