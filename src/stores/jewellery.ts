import { writable } from 'svelte/store';
import type { Product } from '#/types/product';

export const jewellery = writable<readonly Product[]>([]);
