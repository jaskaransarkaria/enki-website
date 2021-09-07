import { writable } from 'svelte/store';
import type { Product } from '@/types/product';

export const products = writable<readonly Product[]>([]);

export const reset: () => void = () => products.set([]);
