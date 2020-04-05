/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

class App {
  public app: express.Application;

  public port: number;

  constructor(controllers: any[], port: any) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
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
          console.log(`Colorange Sever refused to allow: ${origin}`);
          cb(new Error('Not allowed by CORS'));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    this.app.use(express.static(path.join(__dirname, '../dist')));

    this.app.get('*', (req: Request, res: Response) => {
      res.status(404).send();
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port: ${this.port}`);
    });
  }
}

export default App;
