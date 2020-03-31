/* eslint-disable object-curly-newline */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import ColorThief from 'colorthief';
import { promises } from 'fs';
import fetch from 'node-fetch';
import ora from 'ora';
import path from 'path';
import { readIt } from 'pickitt';
import { getArtworkUrl, saveImage, rgb2Hsl, sortByHue } from './util';
import { App, AppData } from './types';

const main = async (): Promise<void> => {
  let currentSpinner = null;
  try {
    const readingDataSpinner = ora('Reading Data').start();
    currentSpinner = readingDataSpinner;
    const apps: App[] = await readIt(path.join(__dirname, '../data/apps.json'));
    readingDataSpinner.succeed('Successfully Read Data');

    const data: AppData[] = [];

    const gettingArtworkSpinner = ora('Getting Artwork URLs').start();
    currentSpinner = gettingArtworkSpinner;
    for (let i = 0; i < apps.length; i++) {
      const app: App = apps[i];
      const icon = await getArtworkUrl(app.name);
      data.push({ colors: null, icon, name: app.name });
    }
    gettingArtworkSpinner.succeed('Successfully Retrieved Artwork URLs');

    const convertingImagesSpinner = ora('Converting Images').start();
    currentSpinner = convertingImagesSpinner;
    for (let i = 0; i < apps.length; i++) {
      const response = await fetch(data[i].icon);
      const buffer = await response.buffer();
      await saveImage(buffer, `icon${i}.jpg`);

      const colors = await ColorThief.getColor(
        path.join(__dirname, `../icon${i}.jpg`),
      );

      data[i].colors = colors;
    }
    convertingImagesSpinner.succeed('Successfully Converted Images');

    const cleaningFilesSpinner = ora('Cleaning Files').start();
    currentSpinner = cleaningFilesSpinner;
    for (let i = 0; i < apps.length; i++) {
      await promises.unlink(path.join(__dirname, `../icon${i}.jpg`));
    }
    cleaningFilesSpinner.succeed('Successfully Cleaned Files');

    const sortingApplicationsSpinner = ora('Sorting Applications').start();
    currentSpinner = sortingApplicationsSpinner;
    // * Convert colors from RGB to HSL
    data.forEach((app: AppData, i: number) => {
      data[i].colors = rgb2Hsl(app.colors);
    });

    const sortedData = sortByHue(data);

    const sortedNames = [];

    sortedData.forEach((app: AppData) => sortedNames.push(app.name));

    sortingApplicationsSpinner.succeed('Successfully Sorted Applications');
    console.log(sortedNames);
  } catch (e) {
    currentSpinner.fail();
    console.error(e);
  }
};

main();
