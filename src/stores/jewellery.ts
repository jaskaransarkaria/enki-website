import { writable } from 'svelte/store';
import type { JewelleryProduct } from '../types/jewellery-product'

export const jewellery = writable<readonly JewelleryProduct[]>([]);
