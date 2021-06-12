const { AppError } = require('class/AppError');

let customMobiles = {
  all: [],
};

export const fetchMobileFiles = async () => {
  const res = await fetch('/data/mobile-files.json');
  if (!res.ok) throw new AppError('Failed to load Mobile Files');

  const mobiles = await res.json();

  return {
    ...mobiles,
    ...customMobiles,
    all: [...mobiles.all, ...customMobiles.all],
  };
};

export const fetchMobile = async (product_id) => {
  const res = await fetch('/data/mobile-files.json');
  if (!res.ok) throw new AppError('Failed to load Mobile Files');

  const mobileFiles = await res.json();

  const mobile = [...mobileFiles.all, ...customMobiles.all].find(
    (item) => item._id.toString() === product_id
  );

  return mobile;
};

export const mutateMobile = async (payload) => {
  const newMobile = {
    ...payload,
    _id: Math.random().toString().replace('0.', '') + payload.title,
  };

  customMobiles = {
    ...customMobiles,
    all: [...customMobiles.all, newMobile],
    [newMobile._id]: newMobile,
  };

  return {
    success: true,
    res: new Response(customMobiles[newMobile._id]),
  };
};
