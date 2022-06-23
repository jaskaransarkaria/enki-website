import { browser } from "$app/env";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export interface BasketProduct {
  name: string;
  id: string;
  categoryId: number;
  quantity: number;
  price: number;
  currentStock: number;
  giftWrap: boolean;
  giftDescription: string;
  giftWrapToUse: string;
}

export const basket: Writable<BasketProduct[]> = writable(
  browser ? JSON.parse(window.localStorage.getItem("basket") ?? "[]") : []
);

export const reset: () => void = () => basket.set([]);

basket.subscribe((val) => {
  if (browser) {
    window.localStorage.basket = JSON.stringify(val);
  }
});
