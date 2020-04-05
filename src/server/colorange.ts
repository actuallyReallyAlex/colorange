/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
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
import Vibrant from 'node-vibrant';

import { getArtworkUrl, rgb2Hsl, saveImage, sortByHue } from './util';

import { App, AppData, AppProcess } from './types';

const colorange = async (
  apps: App[],
  currentProcesses: AppProcess[],
  processId: string,
): Promise<AppData[]> => {
  const newProcess = {
    id: processId,
    processing: true,
    sortedData: null,
  };

  currentProcesses.push(newProcess);

  let currentSpinner = null;

  try {
    const data: AppData[] = [];

    const gettingArtworkSpinner = ora('Getting Artwork URLs').start();
    currentSpinner = gettingArtworkSpinner;
    for (let i = 0; i < apps.length; i++) {
      const app: App = apps[i];
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
    for (let i = 0; i < apps.length; i++) {
      const response = await fetch(data[i].icon.url);
      const buffer = await response.buffer();
      data[i].icon.base64 = buffer.toString('base64');
      // TODO - Use the buffer, don't save to disk
      await saveImage(buffer, `icon${i}.jpg`);

      const colors = await ColorThief.getColor(
        path.join(__dirname, `../icon${i}.jpg`),
      );

      // const colors = await ColorThief.getPalette(
      //   path.join(__dirname, `../icon${i}.jpg`),
      // );

      const v = new Vibrant(path.join(__dirname, `../icon${i}.jpg`));
      const palette = await v.getPalette();
      const mostUsed = Object.values(palette).sort(
        (a, b) => b.population - a.population,
      )[0];

      const vibColorPopulation = mostUsed.rgb;
      const vibColorVib = palette.Vibrant.getRgb();

      // data[i].colors = colors;
      // data[i].colors = vibColorPopulation;
      data[i].colors = vibColorVib;
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

    const sortedAppData = sortByHue(data);

    sortingApplicationsSpinner.succeed('Successfully Sorted Applications');

    const currentProcess = currentProcesses.find(
      (proc: AppProcess) => proc.id === processId,
    );

    currentProcess.sortedData = sortedAppData;
    currentProcess.processing = false;

    return sortedAppData;
  } catch (e) {
    currentSpinner.fail();
    console.error(e);
    return null;
  }
};

export default colorange;
