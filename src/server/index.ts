/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import cors from 'cors';
import express, { Request } from 'express';
import { promises } from 'fs';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';

import colorange from './colorange';

import { AppProcess } from './types';

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req: Request, file: any, cb: Function) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error('File must be a .csv file.'));
    }

    return cb(undefined, true);
  },
});

app.use(express.json());

app.use(morgan('dev'));

const whitelistDomains = [
  'http://localhost:3000',
  'https://colorange.herokuapp.com',
  undefined,
];

const corsOptions = {
  origin: (origin: string, cb: Function): void => {
    if (whitelistDomains.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      console.log(`Colorange Sever refused to allow: ${origin}`);
      cb(new Error('Not allowed by CORS'));
    }
  },
};

const currentProcesses: AppProcess[] = [];

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    console.log(`Received file: ${req.file.originalname}`);

    const data = req.file.buffer.toString('utf8');

    const parsedData = Papa.parse(data, {
      complete: (results: any) => {
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

    colorange(finalAppData, currentProcesses, processId);

    res.send({ processId });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

app.get('/status', async (req, res) => {
  const { id } = req.query;
  const currentProcess = currentProcesses.find(
    (proc: AppProcess) => proc.id === id,
  );

  if (currentProcess.processing) {
    res.status(202).send();
  } else {
    const curentProcessIndex = currentProcesses.indexOf(currentProcess);
    console.log({ curentProcessIndex }); // ? Might fail

    currentProcesses.splice(curentProcessIndex, 1);

    await promises.writeFile(
      path.join(__dirname, 'example.json'),
      JSON.stringify(currentProcess.sortedData),
    );

    res.send(currentProcess.sortedData);
  }
});

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
