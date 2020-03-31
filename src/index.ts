import ColorThief from 'colorthief';
import path from 'path';

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
  } catch (e) {
    console.log(e);
  }
};

main();
