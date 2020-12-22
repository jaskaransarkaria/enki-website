import { Writable, writable } from 'svelte/store';

export const basket: Writable<string[]> = writable([]);
