/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import fetch from 'node-fetch';
import ora from 'ora';
import mongoose from 'mongoose';
import Vibrant from 'node-vibrant';
import ProgressBar from 'progress';

import Application from './models/application';

import { getArtworkUrl, rgb2Hsl, sortByHue } from './util';

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
    const data: any[] = [];

    const bar = new ProgressBar(
      ' Getting Artwork URLs [:bar] :percent (:current / :total) :etas',
      { total: apps.length, width: 20 },
    );
    for (let i = 0; i < apps.length; i++) {
      const app: App = apps[i];

      const dbApp = await Application.findOne({ name: app.name });

      if (dbApp) {
        data.push(dbApp);
        bar.tick();
      } else {
        const icon = {
          url: null,
        };

        const iconURL = await getArtworkUrl(app.name);
        icon.url = iconURL;
        data.push({ colors: null, icon, name: app.name });
        bar.tick();
      }
    }
    ora('Successfully Retrieved Artwork URLs').succeed();

    const convertingImagesSpinner = ora('Converting Images').start();
    currentSpinner = convertingImagesSpinner;
    for (let i = 0; i < apps.length; i++) {
      const app = data[i];
      const dbApp = await Application.findOne({ name: app.name });

      // ? I think at this point, if it was in the DB, it woud've been pushed in the prev step
      if (!dbApp) {
        const response = await fetch(app.icon.url);
        const buffer = await response.buffer();
        app.icon.base64 = buffer.toString('base64');

        const v = new Vibrant(buffer);
        const palette = await v.getPalette();
        const vibColorVib = palette.Vibrant.getRgb();

        app.colors = vibColorVib;
      }
    }
    convertingImagesSpinner.succeed('Successfully Converted Images');

    const sortingApplicationsSpinner = ora('Sorting Applications').start();
    currentSpinner = sortingApplicationsSpinner;
    // * Convert colors from RGB to HSL
    data.forEach((app: AppData, i: number) => {
      data[i].colors = rgb2Hsl(app.colors);
    });

    const sortedAppData = sortByHue(data);

    sortingApplicationsSpinner.succeed('Successfully Sorted Applications');

    const storingApplicationsInDBSpinner = ora(
      'Storing Applications in DB',
    ).start();
    sortedAppData.forEach(async (application: AppData) => {
      const dbApp = await Application.findOne({ name: application.name });

      if (!dbApp) {
        const newApp = new Application({
          colors: application.colors,
          icon: application.icon,
          name: application.name,
        });
        await newApp.save();
      }
    });
    storingApplicationsInDBSpinner.succeed('Applications Stored in Database');

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
