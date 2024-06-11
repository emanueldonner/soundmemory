import { writable } from 'svelte/store';

export const showNotes = writable(false);
export const instrument = writable('acoustic_grand_piano');
export const noteLength = writable(1000);
