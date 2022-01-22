import { writable } from 'svelte/store';
import type { Category } from '@/types/category';

const initialValue = {
  Id: 0,
  ParentId: null,
  Name: '',
  Children: [],
  NominalCode: '',
};

export const categories = writable<Category>(initialValue);

export const readonlyAllCategories = writable<Category[]>([]);

export const reset: () => void = () => categories.set(initialValue);

export const resetReadonlyAllCategoriesStore: () => void = () =>
  readonlyAllCategories.set([]);
