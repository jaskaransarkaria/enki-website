import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const modalDismissedCount: Writable<number> = writable(
  browser
    ? JSON.parse(window.localStorage.getItem("modalDismissedCount") ?? "0")
    : 0,
);

export const reset: () => void = () => modalDismissedCount.set(0);

modalDismissedCount.subscribe((val) => {
  if (browser) {
    window.localStorage.modalDismissedCount = JSON.stringify(val);
  }
});

export const isSignedUp: Writable<boolean> = writable(
  browser
    ? JSON.parse(window.localStorage.getItem("isSignedUp") ?? "false")
    : false,
);

isSignedUp.subscribe((val) => {
  if (browser) {
    window.localStorage.isSignedUp = JSON.stringify(val);
  }
});

export const NEWSLETTER_DISMISS_LIMIT = 3;
