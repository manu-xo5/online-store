const fs = require('fs');
const path = require('path');

const between = (min, max) => (Math.random() * (max - min) + min) | 0;

const res = {
  all: [],
};

const all = JSON.parse(
  fs.readFileSync(path.resolve('../../public/data/mobile-files.json'))
);
for (const data of all) {
  data.price = between(8, 30) * 1000;
  res[data._id] = data;
  res.all.push(data);
}

console.log(res);
fs.writeFileSync(
  path.resolve('./mobileFiles.new.json'),
  JSON.stringify(res, null, 2)
);
