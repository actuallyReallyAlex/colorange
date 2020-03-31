/* eslint-disable import/extensions */
import ColorThief from 'colorthief';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import { HSLColors, RGBColors } from './types';

const rgb2Hsl = (colors: RGBColors): HSLColors => {
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
  } catch (e) {
    console.log(e);
  }
};

main();
