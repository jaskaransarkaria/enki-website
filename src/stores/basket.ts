import { Writable, writable } from 'svelte/store';

export interface BasketProduct {
  name: string;
  id: string;
  quantity: number;
  price: number;
  currentStock: number;
}

export const basket: Writable<BasketProduct[]> = writable(
  JSON.parse(localStorage.getItem('basket') ?? '[]')
);

export const reset: () => void = () => basket.set([]);

basket.subscribe((val) => (localStorage.basket = JSON.stringify(val)));
