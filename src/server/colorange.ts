import fetch from 'node-fetch';
import Vibrant from 'node-vibrant';
import ProgressBar from 'progress';

import Application from './models/application';

import { getArtworkUrl, rgb2Hsl } from './util';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = [];

    const bar = new ProgressBar(
      'Getting Application Information [:bar] :percent (:current / :total) :etas',
      { total: apps.length, width: 20 },
    );

    for (let i = 0; i < apps.length; i += 1) {
      const app: App = apps[i];

      const dbApp = await Application.findOne({ name: app.name });

      if (dbApp) {
        data.push(dbApp);
        bar.tick();
      } else {
        const application = {
          icon: {
            base64: null,
            url: null,
          },
          luminosity: null,
          name: app.name,
        };

        application.icon.url = await getArtworkUrl(application.name);

        const response = await fetch(application.icon.url);
        const buffer = await response.buffer();
        application.icon.base64 = buffer.toString('base64');

        const v = new Vibrant(buffer);
        const palette = await v.getPalette();
        const vibColorVib = palette.Vibrant.getRgb();
        const hsl = rgb2Hsl(vibColorVib);

        // * New sort by Luminosity
        const repetitions = 8;
        let lum = Math.sqrt(
          0.241 * vibColorVib[0] +
            0.691 * vibColorVib[1] +
            0.068 * vibColorVib[2],
        );

        const h2 = Number(hsl[0] * repetitions);
        // const lum2 = Number(lum * repetitions);
        let v2 = Number(hsl[2] * repetitions);

        if (h2 % 2 === 1) {
          v2 = repetitions - v2;
          lum = repetitions - lum;
        }

        application.luminosity = { h2, lum, v2 };

        data.push(application);
        const newApp = new Application({
          icon: application.icon,
          luminosity: application.luminosity,
          name: application.name,
        });
        await newApp.save();
        bar.tick();
      }
    }

    const sortByLuminosity = (applicationData: AppData[]): AppData[] =>
      [...applicationData].sort((a, b) => {
        let sortBy = 'h2';
        if (a.luminosity.h2 === b.luminosity.h2) {
          sortBy = 'lum';
        }
        if (
          a.luminosity.h2 === b.luminosity.h2 &&
          a.luminosity.lum === b.luminosity.lum
        ) {
          sortBy = 'v2';
        }
        return a.luminosity[sortBy] - b.luminosity[sortBy];
      });

    const sortedAppData = sortByLuminosity(data);

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
