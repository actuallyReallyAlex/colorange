/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import fetch from 'node-fetch';
import ProgressBar from 'progress';
import mongoose from 'mongoose';
import Vibrant from 'node-vibrant';

import Application from './models/application';

import { getArtworkUrl, rgb2Hsl, sortByHue, hsl2rgb } from './util';

import { App, AppData } from './types';

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const main = async () => {
  const appList = [
    { name: 'Uber' },
    { name: 'Onyx' },
    { name: 'Six Pack in 30 Days' },
    { name: 'NYTimes' },
    { name: 'Postmates' },
    { name: 'YouTube' },
    { name: "Harry's" },
    { name: 'Yelp' },
    { name: 'Nike Run Club' },
  ];

  const colorange = async (): Promise<any[]> => {
    try {
      const data: any[] = [];

      const bar = new ProgressBar(
        'Getting Application Information [:bar] :percent (:current / :total) :etas',
        { total: appList.length, width: 20 },
      );

      for (let i = 0; i < appList.length; i++) {
        const app: App = appList[i];

        const dbApp = await Application.findOne({ name: app.name });

        if (dbApp) {
          data.push(dbApp);
          bar.tick();
        } else {
          const application = {
            colors: null,
            icon: {
              base64: null,
              url: null,
            },
            name: app.name,
          };

          application.icon.url = await getArtworkUrl(application.name);

          const response = await fetch(application.icon.url);
          const buffer = await response.buffer();
          application.icon.base64 = buffer.toString('base64');

          const v = new Vibrant(buffer);
          const palette = await v.getPalette();
          const vibColorVib = palette.Vibrant.getRgb();

          application.colors = rgb2Hsl(vibColorVib);

          data.push(application);
          const newApp = new Application({
            colors: application.colors,
            icon: application.icon,
            name: application.name,
          });
          await newApp.save();
          bar.tick();
        }
      }

      const sortedAppData = sortByHue(data);

      return sortedAppData;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const sorted = await colorange();

  // const cleanSorted = sorted.map((app: AppData) => ({
  //   // colors: app.colors,
  //   name: app.name,
  // }));

  // const withLums = cleanSorted.map((app) => {
  //   const rgb = hsl2rgb(app.colors);
  //   let lum = Math.sqrt(0.241 * rgb[0] + 0.691 * rgb[1] + 0.068 * rgb[2]);

  //   const repetitions = 8;

  //   const h2 = Number(app.colors[0] * repetitions);
  //   const lum2 = Number(lum * repetitions);
  //   let v2 = Number(app.colors[2] * repetitions);

  //   if (h2 % 2 === 1) {
  //     v2 = repetitions - v2;
  //     lum = repetitions - lum;
  //   }

  //   const lumSort = { h2, lum, v2 };
  //   return { colors: app.colors, lumSort, name: app.name };
  // });

  // // console.log(JSON.stringify(withLums, null, 2));

  // const final = [...withLums].sort((a, b) => {
  //   let sortBy = 'h2';
  //   if (a.lumSort.h2 === b.lumSort.h2) {
  //     sortBy = 'lum';
  //   }
  //   if (a.lumSort.h2 === b.lumSort.h2 && a.lumSort.lum === b.lumSort.lum) {
  //     sortBy = 'v2';
  //   }

  //   return b.lumSort[sortBy] - a.lumSort[sortBy];
  // });

  // console.log(JSON.stringify(final, null, 2));
};

main();
