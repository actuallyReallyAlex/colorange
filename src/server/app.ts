import chalk from 'chalk';
import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import * as Sentry from '@sentry/node';
import ttyStream from 'tty';

import { Controller } from './types';

class App {
  public app: express.Application;

  public port: number | string;

  constructor(controllers: Controller[], port: number | string) {
    this.app = express();
    this.port = port;

    App.initializeStream();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  private initializeErrorHandler(): void {
    this.app.use(Sentry.Handlers.errorHandler());
  }

  static initializeStream(): void {
    if (!process.stderr.isTTY) {
      const tty = ttyStream.WriteStream.prototype;
      Object.keys(tty).forEach((key) => {
        process.stderr[key] = tty[key];
      });
      process.stderr.columns = 80;
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(Sentry.Handlers.requestHandler());
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    this.app.use(express.json());
    this.app.use(morgan('dev'));
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
          console.error(`Colorange Sever refused to allow: ${origin}`);
          cb(new Error('Not allowed by CORS'));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    this.app.use(express.static(path.join(__dirname, '../dist')));

    this.app.get('*', (req: Request, res: Response) => {
      res.status(404).send();
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Mode: ${chalk.yellowBright(process.env.NODE_ENV)}\n`);
      console.log(
        `Server is listening on port: ${chalk.yellowBright(this.port)}\n`,
      );
    });
  }
}

export default App;
