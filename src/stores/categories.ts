import { writable } from 'svelte/store';
import type { Category } from '@/types/category';

const initialValue = {
  Id: 0,
  Name: '',
  Children: [],
};

export const categories = writable<Category>(initialValue);

export const reset: () => void = () => categories.set(initialValue);
