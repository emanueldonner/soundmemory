<script>
	import { onMount } from 'svelte';
	import Soundfont from 'soundfont-player';
	import KeyboardKey from '../../lib/components/KeyboardKey.svelte';
	import { playerSequenceStore, beginnerMode } from '$lib/stores';
	import NoteLabel from '../../lib/components/NoteLabel.svelte';

	let audioContext;
	let player;
	const roundTitles = {
		0: 'Welcome to the game',
		1: 'Single Note of Doom',
		2: 'Double Note of Doom',
		3: 'The Three Notes of Doom',
		4: 'Baby steps of Doom',
		5: 'Longing for the notes of Doom',
		6: 'A journey to the center of Mount Doom',
		7: 'Hold the notes of Doom',
		8: 'Lord of the Notes of Doom',
		9: 'Fun of Doom',
		10: 'Doom of Fun',
		11: 'The doom can not stop you',
		12: 'Absolute chaos of Doom of Fun',
		13: 'The doom is not a game',
		14: 'Stop it!',
		15: 'I said stop it!',
		16: 'Where are you going with this?',
		17: 'Are you seriously still playing this?',
		18: "Well I'll be outside, if you need anything",
		19: '...'
	};
	let notes = [
		{ note: 'C4', label: 'C', color: 'hsl(330, 80%, 45%)', type: 'white' },
		{ note: 'D4', label: 'D', color: 'hsl(150, 80%, 45%)', type: 'white' },
		{ note: 'E4', label: 'E', color: 'hsl(210, 80%, 45%)', type: 'white' },
		{ note: 'F4', label: 'F', color: 'hsl(90, 80%, 45%)', type: 'white' },
		{ note: 'G4', label: 'G', color: 'hsl(0, 80%, 60%)', type: 'white' },
		{ note: 'A4', label: 'A', color: 'hsl(270, 80%, 45%)', type: 'white' },
		{ note: 'B4', label: 'B', color: 'hsl(30, 80%, 45%)', type: 'white' },
		{ note: 'C#4', label: 'C#', color: 'hsl(330, 80%, 35%)', type: 'black' },
		{ note: 'D#4', label: 'D#', color: 'hsl(150, 80%, 35%)', type: 'black' },
		{ note: '', label: 'Rest', color: '#aaa', type: 'break black' },
		{ note: 'F#4', label: 'F#', color: 'hsl(90, 80%, 35%)', type: 'black' },
		{ note: 'G#4', label: 'G#', color: 'hsl(0, 80%, 50%)', type: 'black' },
		{ note: 'A#4', label: 'A#', color: 'hsl(270, 80%, 35%)', type: 'black' }
	];
	let sequence = [];
	$: playerSequence = $playerSequenceStore;
	let round = 0;
	let playingSequence = false;
	let globeColor = 'white';
	let pauseTime = 2000;
	let currentNote = {};
	let initialLoad;
	let showGameOverAlert = false;
	$: localbeginnerMode = $beginnerMode;

	onMount(() => {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
		Soundfont.instrument(audioContext, 'string_ensemble_2').then((piano) => {
			player = piano;
		});
		initialLoad = true;
	});

	const playSound = (note) => {
		// Play the note sound using Soundfont.js or any other library
		if (player && player.play) {
			player.stop();
			player.play(note.note);
			console.log('Playing sound for', note);
		}
	};

	const playSequence = async () => {
		playingSequence = true;

		for (const note of sequence) {
			playSound(note);
			globeColor = note.color;
			currentNote = note;
			await new Promise((resolve) => setTimeout(resolve, pauseTime));
			globeColor = 'white'; // Fade back to white
			currentNote = {};
			await new Promise((resolve) => setTimeout(resolve, pauseTime / 4)); // Adjust timing if necessary
		}
		playingSequence = false;
	};

	const addNoteToSequence = () => {
		const randomNote = notes[Math.floor(Math.random() * notes.length)];
		sequence.push(randomNote);
	};

	const startRound = async () => {
		playerSequenceStore.set([]);
		round++;
		addNoteToSequence();
		await playSequence();
	};

	const handleNoteClick = (note) => {
		if (playingSequence) return;

		playerSequence.push(note);
		playerSequenceStore.set(playerSequence);
		playSound(note);
		console.log('Sequence', playerSequence);
		let currentPlayerSequence = $playerSequenceStore;
		const currentIndex = currentPlayerSequence.length - 1;
		if (currentPlayerSequence[currentIndex] !== sequence[currentIndex]) {
			showGameOverAlert = true;
		} else if (currentPlayerSequence.length === sequence.length) {
			if (pauseTime >= 400) pauseTime -= 200;

			setTimeout(startRound, 2000);
		}
	};

	const resetGame = () => {
		showGameOverAlert = false;
		round = 0;
		sequence = [];

		playerSequenceStore.set([]);
		pauseTime = 2000;
		globeColor = 'white';
		playingSequence = false;
		startRound();
		setTimeout(() => {}, 2000);
	};
</script>

<div class="container">
	{#if initialLoad}
		<h2>Welcome to</h2>
		<h1>Sequence of Doom</h1>
		<p>
			Listen to the notes of doom and try to match them to defeat the lord of the notes of doom.
		</p>
		<div class="expert-container">
			<input
				type="checkbox"
				bind:checked={localbeginnerMode}
				on:change={(e) => beginnerMode.set(e.target.checked)}
			/>
			<label for="beginnerMode">Beginner Mode</label>
		</div>
		<button
			class="start-button"
			on:click={() => {
				resetGame();
				initialLoad = false;
			}}>Start Game</button
		>
	{:else}
		<div class="sequence-container">
			<div class="sequence-globe" style="background: {globeColor}">
				{#if currentNote && currentNote.label}
					<NoteLabel note={currentNote} />
				{/if}
			</div>
		</div>
		<h1>Sequence of Doom</h1>
		<p>Round: {round} - "{roundTitles[round]}"</p>
		<small
			><div class="expert-container">
				<input
					type="checkbox"
					bind:checked={localbeginnerMode}
					on:change={(e) => beginnerMode.set(e.target.checked)}
				/>
				<label for="beginnerMode">Beginner Mode</label>
			</div></small
		>
		<div class="keyboard-container" class:inactive={playingSequence}>
			{#each notes as note, index}
				<KeyboardKey key={index} {note} onClick={handleNoteClick} />
			{/each}
		</div>
		<div class="player-sequence-container note-container">
			{#each playerSequence as note}
				<div class="note" style="background: {note.color}">
					<NoteLabel {note} />
				</div>
			{/each}
		</div>
	{/if}
	{#if showGameOverAlert}
		<div class="game-over-alert">
			<h2>Game Over</h2>
			<p>You played the wrong note of doom.</p>
			<p>The correct sequence was</p>
			<div class="note-container">
				{#each sequence as note}
					<div class="note" style="background: {note.color}">
						<NoteLabel {note} />
					</div>
				{/each}
			</div>
			<p>You played</p>
			<div class="note-container player-note-container">
				{#each playerSequence as note}
					<div class="note" style="background: {note.color}">
						<NoteLabel {note} />
					</div>
				{/each}
			</div>
			<p>You made it to</p>
			<p>Round {round} - "{roundTitles[round]}"</p>
			<button
				class="reset-button"
				on:click={() => {
					resetGame();
				}}>Play again</button
			>
		</div>
	{/if}
</div>

<style>
	h1,
	h2 {
		margin: 0;
	}
	h1 {
		font-size: 3rem;
	}
	h2 {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		min-height: 60vh;
	}
	.start-button {
		background-color: rgb(144, 231, 182);
		color: black;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.start-button:hover {
		background-color: rgba(10, 160, 75, 0.8);
	}
	.sequence-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.1);
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.sequence-globe {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		color: #fff;
		transition: background-color 0.2s ease-out;
	}

	.expert-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		/* padding: 1rem; */
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}

	.keyboard-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		perspective: 1000px;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.inactive {
		pointer-events: none;
		/* opacity: 0.5; */
	}

	.game-over-alert {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		color: #fff;
		background-color: rgba(59, 13, 13, 0.963);
		padding: 1rem;
		z-index: 100;
		& p {
			margin: 0;
		}
	}
	.note-container {
		display: flex;
		width: 600px;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.player-note-container :last-child {
		outline: 3px solid #b02c2c;
	}
	.note {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		color: #fff;
		transition: background-color 0.2s ease-out;
		border: 1px solid #ffffffc4;
	}
	.reset-button {
		background-color: rgb(144, 231, 182);
		color: black;
		border: none;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		font-size: 1.3rem;
		cursor: pointer;
	}
	.reset-button:hover {
		background-color: rgba(10, 160, 75, 0.8);
	}
</style>
