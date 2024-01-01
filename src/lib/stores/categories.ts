import { writable } from "svelte/store";
import type { Category } from "$lib/types/category";

const initialValue = {
  Id: 0,
  ParentId: null,
  Name: "",
  Children: [],
  NominalCode: "",
  Description: "",
};

export const categories = writable<Category>(initialValue);

export const readonlyAllCategories = writable<readonly Category[]>([]);

export const reset: () => void = () => categories.set(initialValue);

export const resetReadonlyAllCategoriesStore: () => void = () =>
  readonlyAllCategories.set([]);
