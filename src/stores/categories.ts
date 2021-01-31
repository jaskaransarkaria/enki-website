import { writable } from 'svelte/store';

export interface Category {
  Id: string;
  Name: string;
  Children: Category[];
}

export const categories = writable<Category>({
  Id: '',
  Name: '',
  Children: [],
});
