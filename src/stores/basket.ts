import { Writable, writable } from 'svelte/store';

export interface BasketProduct {
  id: string;
  quantity: number;
}

export const basket: Writable<BasketProduct[]> = writable([]);

export const reset = () => basket.set([]);
