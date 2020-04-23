import store from 'app-store-scraper';
import sharp, { OutputInfo } from 'sharp';
import fetch from 'node-fetch';
import Vibrant from 'node-vibrant';
import { Document } from 'mongoose';

import Application from './models/application';

import {
  AppData,
  App,
  AppStoreScraperApp,
  HSLColors,
  RGBColors,
} from './types';

export const saveImage = async (
  buffer: Buffer,
  path: string,
): Promise<OutputInfo> => sharp(buffer).toFile(path);

export const getArtworkUrl = async (appName: string): Promise<string> => {
  const application: AppStoreScraperApp[] = await store.search({
    term: appName,
    num: 1,
  });
  return application[0].icon.replace('512x512', '90x90');
};

export const rgb2Hsl = (colors: RGBColors): HSLColors => {
  const r = colors[0] / 255;
  const g = colors[1] / 255;
  const b = colors[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = (max + min) / 2;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        throw new Error('RGB Issue');
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

export const hsl2rgb = (colors: HSLColors): RGBColors => {
  const h = colors[0];
  let s = colors[1];
  let l = colors[2];
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
};

export const sortByHue = (apps: AppData[]): AppData[] =>
  apps.sort((a: AppData, b: AppData) => a.colors[0] - b.colors[0]);

/**
 * Returns an application instance using the MongoDB database.
 * @param app Application.
 */
export const createApplicationInstance = async (
  app: App,
  bar: ProgressBar,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any[],
): Promise<AppData | Document> => {
  try {
    const dbApp = await Application.findOne({ name: app.name });

    if (dbApp) {
      bar.tick();
      group.push(dbApp);
      return dbApp;
    }

    const application = {
      icon: {
        base64: null,
        url: await getArtworkUrl(app.name),
      },
      luminosity: null,
      name: app.name,
    };

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
      0.241 * vibColorVib[0] + 0.691 * vibColorVib[1] + 0.068 * vibColorVib[2],
    );

    const h2 = Number(hsl[0] * repetitions);
    // const lum2 = Number(lum * repetitions);
    let v2 = Number(hsl[2] * repetitions);

    if (h2 % 2 === 1) {
      v2 = repetitions - v2;
      lum = repetitions - lum;
    }

    application.luminosity = { h2, lum, v2 };

    const newApp = new Application({
      icon: application.icon,
      luminosity: application.luminosity,
      name: application.name,
    });
    await newApp.save();
    bar.tick();
    group.push(application);
    return application;
  } catch (e) {
    bar.terminate();
    throw new Error(e);
  }
};

export const sortByLuminosity = (applicationData: AppData[]): AppData[] =>
  [...applicationData].sort((a, b) => {
    if (!a.luminosity) {
      throw new Error(`Issue - ${JSON.stringify(a, null, 2)}`);
    }
    if (!b.luminosity) {
      throw new Error(`Issue - ${JSON.stringify(b, null, 2)}`);
    }
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
