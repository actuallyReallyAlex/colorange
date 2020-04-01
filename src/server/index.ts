/* eslint-disable import/extensions */
/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import colorange from './colorange';

const app = express();
const port = process.env.PORT || 3000;

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

app.post('/test', async (req, res) => {
  const { apps } = req.body;
  const sortedColors: string[] = await colorange(apps);
  res.send(sortedColors);
});

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
