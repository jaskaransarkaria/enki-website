import { writable } from "svelte/store";
import type { SquareProduct } from "$lib/types/product";

export const products = writable<readonly SquareProduct[]>([]);

export const reset: () => void = () => products.set([]);
