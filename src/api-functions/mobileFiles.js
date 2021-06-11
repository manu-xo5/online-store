const { AppError } = require('class/AppError');

export const fetchMobileFiles = async () => {
  const res = await fetch('/data/mobile-files.json');
  if (!res.ok) throw new AppError('Failed to load Mobile Files');
  return await res.json();
};

export const fetchMobile = async (product_id) => {
  const res = await fetch('/data/mobile-files.json');
  if (!res.ok) throw new AppError('Failed to load Mobile Files');

  const mobileFiles = await res.json();

  return mobileFiles.all.find((item) => item._id.toString() === product_id);
};
