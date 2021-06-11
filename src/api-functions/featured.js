import { AppError } from 'class/AppError';

export const fetchFeatured = async () => {
  const res = await fetch('/data/featured.json');
  if (!res.ok) throw new AppError('Failed to load featured items');
  return await res.json();
};
