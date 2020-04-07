/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import fetch from 'node-fetch';
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

  try {
    const data: any[] = [];

    const bar = new ProgressBar(
      'Getting Application Information [:bar] :percent (:current / :total) :etas',
      { total: apps.length, width: 20 },
    );

    for (let i = 0; i < apps.length; i++) {
      const app: App = apps[i];

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

    const currentProcess = currentProcesses.find(
      (proc: AppProcess) => proc.id === processId,
    );

    currentProcess.sortedData = sortedAppData;
    currentProcess.processing = false;

    return sortedAppData;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default colorange;
