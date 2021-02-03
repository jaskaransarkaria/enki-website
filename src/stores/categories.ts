import { writable } from 'svelte/store';
import type { Category } from '../types/category'

export const categories = writable<Category>({
  Id: '',
  Name: '',
  Children: [],
});
