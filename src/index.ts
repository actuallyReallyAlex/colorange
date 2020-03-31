/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import ColorThief from 'colorthief';
import { promises } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { readIt } from 'pickitt';
import sharp from 'sharp';
import { getArtworkUrl, saveImage } from './util';
import { App } from './types';

const main = async (): Promise<void> => {
  try {
    const apps: App[] = await readIt(path.join(__dirname, '../data/apps.json'));

    const icons = [];

    for (let i = 0; i < apps.length; i++) {
      const app: App = apps[i];
      const icon = await getArtworkUrl(app.name);
      icons.push(icon);
    }

    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      const response = await fetch(icons[i]);
      const buffer = await response.buffer();
      await saveImage(buffer, `icon${i}.jpg`);

      const color = await ColorThief.getColor(
        path.join(__dirname, `../icon${i}.jpg`),
      );
      console.log(icon);
      console.log(i);
      console.log(color);
    }

    for (let i = 0; i < icons.length; i++) {
      await promises.unlink(path.join(__dirname, `../icon${i}.jpg`));
    }

    console.log('done');
  } catch (e) {
    console.error(e);
  }
};

main();
