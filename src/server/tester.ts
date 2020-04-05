/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { promises } from 'fs';
import fetch from 'node-fetch';
import ora from 'ora';
import path from 'path';
import Vibrant from 'node-vibrant';

import { getArtworkUrl, rgb2Hsl, saveImage, sortByHue } from './util';

import { App } from './types';

export interface AppData {
  colors?: number[];
  icon: { url?: string };
  name: string;
  palette?: object;
}

const main = async () => {
  const appList = [{ name: 'NYTimes' }, { name: 'Yelp' }, { name: 'YouTube ' }];

  const colorange = async (): Promise<any[]> => {
    let currentSpinner = null;

    try {
      const data: AppData[] = [];

      const gettingArtworkSpinner = ora('Getting Artwork URLs').start();
      currentSpinner = gettingArtworkSpinner;
      for (let i = 0; i < appList.length; i++) {
        const app: App = appList[i];
        const icon = {
          buffer: null,
          url: null,
        };
        const iconURL = await getArtworkUrl(app.name);
        icon.url = iconURL;
        data.push({ colors: null, icon, name: app.name });
      }
      gettingArtworkSpinner.succeed('Successfully Retrieved Artwork URLs');

      const convertingImagesSpinner = ora('Converting Images').start();
      currentSpinner = convertingImagesSpinner;
      for (let i = 0; i < appList.length; i++) {
        const response = await fetch(data[i].icon.url);
        const buffer = await response.buffer();
        // data[i].icon.base64 = buffer.toString('base64');
        // TODO - Use the buffer, don't save to disk
        await saveImage(buffer, `icon${i}.jpg`);

        // const colors = await ColorThief.getColor(
        //   path.join(__dirname, `../icon${i}.jpg`),
        // );

        // const colors = await ColorThief.getPalette(
        //   path.join(__dirname, `../icon${i}.jpg`),
        // );

        const v = new Vibrant(path.join(__dirname, `../icon${i}.jpg`));
        const palette = await v.getPalette();
        // const mostUsed = Object.values(palette).sort(
        //   (a, b) => b.population - a.population,
        // )[0];

        // const vibColorPopulation = mostUsed.rgb;
        const vibColorVib = palette.Vibrant.getRgb();

        if (data[i].name === 'YouTube') {
          console.log(`YouTube Palette: ${JSON.stringify(palette, null, 2)}`);
        }

        // data[i].colors = colors;
        // data[i].colors = vibColorPopulation;
        data[i].palette = palette;
        data[i].colors = vibColorVib;
      }
      convertingImagesSpinner.succeed('Successfully Converted Images');

      const cleaningFilesSpinner = ora('Cleaning Files').start();
      currentSpinner = cleaningFilesSpinner;
      for (let i = 0; i < appList.length; i++) {
        await promises.unlink(path.join(__dirname, `../icon${i}.jpg`));
      }
      cleaningFilesSpinner.succeed('Successfully Cleaned Files');

      const sortingApplicationsSpinner = ora('Sorting Applications').start();
      currentSpinner = sortingApplicationsSpinner;
      // * Convert colors from RGB to HSL
      data.forEach((app: AppData, i: number) => {
        data[i].colors = rgb2Hsl(app.colors);
      });

      const sortedAppData = sortByHue(data);

      sortingApplicationsSpinner.succeed('Successfully Sorted Applications');

      const cleanerSortedAppData = sortedAppData.map((app: AppData) => ({
        colors: app.colors,
        name: app.name,
        palette: app.palette,
      }));

      return cleanerSortedAppData;
    } catch (e) {
      currentSpinner.fail();
      console.error(e);
      return null;
    }
  };

  const sorted = await colorange();

  console.log(JSON.stringify(sorted, null, 2));
};

main();
