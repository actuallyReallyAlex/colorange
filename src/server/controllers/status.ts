/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express, { Router, Request, Response } from 'express';
import { promises } from 'fs';
import path from 'path';

import { AppProcess } from '../types';

class StatusController {
  public router: Router = express.Router();

  public currentProcesses: AppProcess[] = [];

  constructor(currentProcesses) {
    this.currentProcesses = currentProcesses;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/status', async (req: Request, res: Response) => {
      const { id } = req.query;
      const currentProcess = this.currentProcesses.find(
        (proc: AppProcess) => proc.id === id,
      );

      if (currentProcess.processing) {
        res.status(202).send();
      } else {
        const curentProcessIndex = this.currentProcesses.indexOf(
          currentProcess,
        );
        console.log({ curentProcessIndex }); // ? Might fail

        this.currentProcesses.splice(curentProcessIndex, 1);

        await promises.writeFile(
          path.join(__dirname, 'example.json'),
          JSON.stringify(currentProcess.sortedData),
        );

        res.send(currentProcess.sortedData);
      }
    });
  }
}

export default StatusController;
