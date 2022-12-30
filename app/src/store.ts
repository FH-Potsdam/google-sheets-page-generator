import { writable, Writable } from 'svelte/store';

export const data: Writable<{item}[]> = writable(null);
export const loaded: Writable<boolean> = writable(false);

export const load = (): void => {
  fetch("data.json")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      data.set(response);
      loaded.set(true);
    });
};