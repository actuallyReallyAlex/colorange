import express, { Router, Request } from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';

import colorange from '../colorange';
import { AppProcess, PapaResults, UploadFile } from '../types';

class UploadController {
  public router: Router = express.Router();

  public currentProcesses: AppProcess[] = [];

  private upload = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter: (req: Request, file: UploadFile, cb: Function) => {
      if (!file.originalname.match(/\.(csv)$/)) {
        return cb(new Error('File must be a .csv file.'));
      }

      return cb(undefined, true);
    },
  });

  constructor(currentProcesses) {
    this.currentProcesses = currentProcesses;
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(
      '/upload',
      this.upload.single('file'),
      async (req: express.Request, res: express.Response) => {
        try {
          console.log(`Received file: ${req.file.originalname}`);

          const data = req.file.buffer.toString('utf8');

          const parsedData = Papa.parse(data, {
            complete: (results: PapaResults) => {
              console.log(
                `${req.file.originalname} contains ${
                  results.data.length - 3
                } entries`,
              );
            },
            error: (err, file, inputElem, reason) => {
              console.log({
                err,
                file,
                inputElem,
                reason,
              });
              res.status(500).send();
            },
          });

          type CSVAppData = string[];

          parsedData.data.shift();
          parsedData.data.shift();
          parsedData.data.pop();

          const finalAppData = parsedData.data.map((appData: CSVAppData) => ({
            name: appData[1].split(/ \(/gm)[0],
          }));

          const processId = uuidv4();

          colorange(finalAppData, this.currentProcesses, processId);

          res.send({ processId });
        } catch (e) {
          console.error(e);
          res.status(500).send();
        }
      },
    );
  }
}

export default UploadController;
