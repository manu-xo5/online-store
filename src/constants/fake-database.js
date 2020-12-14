import MobileFiles from './mobileFiles.json';

export const FT_ITEMS = [
  'CyberShot x10\nBy Sony',
  'SS Trimer\nBy Ustraa',
  'One Headphone\nBy "Kon"',
  'LED Bulb\nBy "Light"',
  'Grey Jerse\nBy "Redhat Bear"',
  'Good Printer\nBy ESPON',
  'Echo Dot\nBy Amazon',
  'Sound System\nBy LG',
];

function Item({ title, manufacturer, points, imgUrl }) {
  return {
    id:
      // Date.now().toString() +
      // Math.random().toString() +
      [...title].reduce((acc, char) => acc + char.charCodeAt(0), ''),
    title,
    manufacturer,
    points,
    imgUrl: require('../assets/mobiles/' + imgUrl),
  };
}

export const CAROSEL_ITEMS = MobileFiles.map(Item);
// export const CAROSEL_ITEMS = [
//   Item({
//     title: 'M J\nJean',
//     imgUrl: 'download.jpg',
//     manufacturer: 'Supa Dry',
//     points: [
//       'Cotton Thread',
//       'Blue Color',
//       'Batch-dyed taffeta',
//       'Made in India',
//       'Now Just for 1,900 rs',
//     ],
//   }),
//   Item({
//     title: 'U70\n5G',
//     imgUrl: '0..webp',
//     manufacturer: 'Samsung',
//     points: [
//       'U70 (256 GB | 8GB)',
//       'Oled display',
//       '5G & wifi 6',
//       'Android 10',
//       'Now Just for 37,000 rs',
//     ],
//   }),
//   Item({
//     title: 'Reno\nRefridgrator',
//     imgUrl: 'download.jpg',
//     manufacturer: 'GL',
//     points: [
//       'Smart Inverter Compressor',
//       'Dual Fridge',
//       'Multi Air Flow',
//       'Royale Handle',
//       'Moist ‘N’ Fresh',
//     ],
//   }),
// ];

export const MainCategories = [
  { Icon: 'FaMars', title: 'Male' },
  { Icon: 'FaVenus', title: 'Female' },
  { Icon: 'FaCouch', title: 'Sofa' },
  { Icon: 'FaTools', title: 'Tools' },
  { Icon: 'FaWineGlass', title: 'Drinks' },
  { Icon: 'FaBook', title: 'Books' },
  { Icon: 'FaTrello', title: 'Toys' },
];

export const SearchDB =
  '[{"title":"Lorem by Ipsum","price":"939","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470713005"},{"title":"Lorem by Ipsum","price":"569","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470362957"},{"title":"Lorem by Ipsum","price":"502","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597469906818"},{"title":"Lorem by Ipsum","price":"27","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597469795931"},{"title":"Lorem by Ipsum","price":"46","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470421159"},{"title":"Lorem by Ipsum","price":"854","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470671817"},{"title":"Lorem by Ipsum","price":"100","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470234013"},{"title":"Lorem by Ipsum","price":"772","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470445502"},{"title":"Lorem by Ipsum","price":"999","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470219077"},{"title":"Lorem by Ipsum","price":"419","desc":"Established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more","options":"A, B, Z","id":"1597470633293"}]';
