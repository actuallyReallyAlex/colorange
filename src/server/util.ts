import store from 'app-store-scraper';
import sharp, { OutputInfo } from 'sharp';

import { AppData, AppStoreScraperApp, HSLColors, RGBColors } from './types';

export const saveImage = async (
  buffer: Buffer,
  path: string,
): Promise<OutputInfo> => sharp(buffer).toFile(path);

export const getArtworkUrl = async (appName: string): Promise<string> => {
  const application: AppStoreScraperApp[] = await store.search({
    term: appName,
    num: 1,
  });
  return application[0].icon;
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
