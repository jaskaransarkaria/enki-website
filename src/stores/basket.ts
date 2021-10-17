import { Writable, writable } from 'svelte/store';

export interface BasketProduct {
  name: string;
  id: string;
  quantity: number;
}

export const basket: Writable<BasketProduct[]> = writable([]);

export const reset: () => void = () => basket.set([]);
