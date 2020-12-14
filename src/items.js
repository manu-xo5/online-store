const fs = require('fs');

function randomPoints() {
  const points = [
    [
      'Cotton Thread',
      'Blue Color',
      'Batch-dyed taffeta',
      'Made in India',
      'Now Just for 1,900 rs',
    ],
    [
      'U70 (256 GB | 8GB)',
      'Oled display',
      '5G & wifi 6',
      'Android 10',
      'Now Just for 37,000 rs',
    ],
    [
      'Smart Inverter Compressor',
      'Dual Fridge',
      'Multi Air Flow',
      'Royale Handle',
      'Moist ‘N’ Fresh',
    ],
  ];

  const randomNumber = Math.floor(Math.random() * 3);
  return points[randomNumber];
}

function t() {
  const files = fs.readdirSync('./assets/mobiles', 'utf-8');
  const items = [];
  for (const filename of files) {
    const [title, manufacturer = filename] = filename.split(/[-.]/);
    items.push({
      title,
      imgUrl: filename,
      manufacturer,
      points: randomPoints(),
    });
  }
  fs.writeFileSync(
    './constants/mobileFiles.json',
    JSON.stringify(items, null, 4)
  );
  console.log(items);
}

t();
