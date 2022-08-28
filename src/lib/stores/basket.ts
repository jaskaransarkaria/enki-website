import { browser } from "$app/env";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { BasketProduct } from "$lib/types/basketProduct";

export const basket: Writable<BasketProduct[]> = writable(
  browser ? JSON.parse(window.localStorage.getItem("basket") ?? "[]") : []
);

export const reset: () => void = () => basket.set([]);

basket.subscribe((val) => {
  if (browser) {
    window.localStorage.basket = JSON.stringify(val);
  }
});
