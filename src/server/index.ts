/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import cors from 'cors';
import express, { Request } from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import Papa from 'papaparse';

import colorange from './colorange';

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

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    req.setTimeout(50000000000);
    console.log(`Received file: ${req.file.originalname}`);

    const data = req.file.buffer.toString('utf8');

    const parsedData = Papa.parse(data, {
      complete: (results: any) => {
        console.log(
          `${req.file.originalname} contains ${results.data.length} entries`,
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

    const sortedColors: string[] = await colorange(finalAppData);
    res.send(sortedColors);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
