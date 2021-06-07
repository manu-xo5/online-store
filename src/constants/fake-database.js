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

export const CAROSEL_ITEMS = MobileFiles.all.map((data) => ({
  ...data,
  imgUrl: require('../assets/mobiles/' + data.imgUrl),
}));

export const MainCategories = [
  { Icon: 'FaMars', title: 'Male' },
  { Icon: 'FaVenus', title: 'Female' },
  { Icon: 'FaCouch', title: 'Sofa' },
  { Icon: 'FaTools', title: 'Tools' },
  { Icon: 'FaWineGlass', title: 'Drinks' },
  { Icon: 'FaBook', title: 'Books' },
  { Icon: 'FaTrello', title: 'Toys' },
];
