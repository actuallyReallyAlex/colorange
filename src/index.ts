/* eslint-disable import/extensions */
import chalk from 'chalk';
import ColorThief from 'colorthief';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import { HSLColors, RGBColors } from './types';

import { rgb2Hsl, hsl2rgb, sortByHue } from './util';

const main = async (): Promise<void> => {
  const img0 = path.join(__dirname, '../data/0.png');
  const img1 = path.join(__dirname, '../data/1.png');
  const img2 = path.join(__dirname, '../data/2.png');
  const img3 = path.join(__dirname, '../data/3.png');
  const img4 = path.join(__dirname, '../data/4.png');

  try {
    const color0 = await ColorThief.getColor(img0);
    const color1 = await ColorThief.getColor(img1);
    const color2 = await ColorThief.getColor(img2);
    const color3 = await ColorThief.getColor(img3);
    const color4 = await ColorThief.getColor(img4);

    console.log({
      color0,
      color1,
      color2,
      color3,
      color4,
    });

    const hsl0 = rgb2Hsl(color0);
    const hsl1 = rgb2Hsl(color1);
    const hsl2 = rgb2Hsl(color2);
    const hsl3 = rgb2Hsl(color3);
    const hsl4 = rgb2Hsl(color4);

    console.log({
      hsl0,
      hsl1,
      hsl2,
      hsl3,
      hsl4,
    });

    const sorted = sortByHue([hsl0, hsl1, hsl2, hsl3, hsl4]);

    console.log({ sorted });

    const coolColors = sorted.map((colors: HSLColors) => hsl2rgb(colors));

    coolColors.forEach((color: RGBColors) => {
      console.log(
        chalk.rgb(
          color[0],
          color[1],
          // eslint-disable-next-line comma-dangle
          color[2]
          // eslint-disable-next-line comma-dangle
        )('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      );
    });
  } catch (e) {
    console.log(e);
  }
};

main();
