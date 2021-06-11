import { AppError } from 'class/AppError';

export const fetchCategories = async () => {
  const res = await fetch('/data/categories.json');
  if (!res.ok) throw new AppError('Failed to Load Categories');
  return await res.json();
};
