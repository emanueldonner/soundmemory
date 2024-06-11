import { writable } from 'svelte/store';

// Sound Memory
export const showNotes = writable(false);
export const instrument = writable('acoustic_grand_piano');
export const noteLength = writable(1000);

// Sequence of Doom
export const beginnerMode = writable(false);
export const playerSequenceStore = writable([]);
