<script>
	import { onMount } from 'svelte';
	import Soundfont from 'soundfont-player';
	import KeyboardKey from '../../lib/components/KeyboardKey.svelte';
	import { playerSequenceStore, beginnerMode } from '$lib/stores';
	import NoteLabel from '../../lib/components/NoteLabel.svelte';

	let audioContext;
	let player;
	let backgroundPlayer;
	let backgroundPlayer2;
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
		{ note: 'B4', label: 'B', color: 'hsl(30, 80%, 55%)', type: 'white' },
		{ note: 'C#4', label: 'C#', color: 'hsl(57, 80%, 45%)', type: 'black' },
		{ note: 'D#4', label: 'D#', color: 'hsl(20, 80%, 45%)', type: 'black' },
		{ note: '', label: 'Rest', color: '#aaa', type: 'break black' },
		{ note: 'F#4', label: 'F#', color: 'hsl(310, 80%, 35%)', type: 'black' },
		{ note: 'G#4', label: 'G#', color: 'hsl(200, 80%, 50%)', type: 'black' },
		{ note: 'A#4', label: 'A#', color: 'hsl(70, 80%, 35%)', type: 'black' }
	];
	let backgroundNotes = [
		'C2',
		'C#2',
		'D2',
		'D#2',
		'E2',
		'F2',
		'F#2',
		'G2',
		'G#2',
		'A2',
		'A#2',
		'B2',
		'C3',
		'C#3',
		'D3'
	];
	let backgroundPauseTime = 3000;
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
		Soundfont.instrument(audioContext, 'string_ensemble_2').then((string) => {
			player = string;
			Soundfont.instrument(audioContext, 'trumpet').then((string2) => {
				backgroundPlayer = string2;
				Soundfont.instrument(audioContext, 'string_ensemble_1').then((string3) => {
					backgroundPlayer2 = string3;
				});
			});
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

	const repeatCurrentSequence = () => {
		if (playingSequence) return;

		playSequence();
	};
	const playBackgroundSound = (note, player) => {
		let duration = (backgroundPauseTime / 1000) * 2;
		let gain = 0.1;
		if (player && player.play) {
			player.play(note, audioContext.currentTime, {
				gain,
				duration
			});
		}
	};

	let backgroundIntervals = [];

	const startBackgroundPlayback = () => {
		const playRandomBackgroundNote = (player) => {
			const randomNote = backgroundNotes[Math.floor(Math.random() * backgroundNotes.length)];
			playBackgroundSound(randomNote, player);
		};

		playRandomBackgroundNote(backgroundPlayer); // Play immediately

		const intervalId1 = setInterval(
			() => playRandomBackgroundNote(backgroundPlayer),
			backgroundPauseTime
		);
		backgroundIntervals.push(intervalId1);

		setTimeout(() => {
			playRandomBackgroundNote(backgroundPlayer2); // Play immediately

			const intervalId2 = setInterval(
				() => playRandomBackgroundNote(backgroundPlayer2),
				backgroundPauseTime
			);
			backgroundIntervals.push(intervalId2);
		}, backgroundPauseTime / 2);
	};

	const stopBackgroundPlayback = () => {
		backgroundIntervals.forEach((intervalId) => clearInterval(intervalId));
		backgroundIntervals = [];
		backgroundPlayer.stop();
		backgroundPlayer2.stop();
	};

	const resetGame = () => {
		showGameOverAlert = false;
		round = 0;
		sequence = [];

		playerSequenceStore.set([]);
		pauseTime = 2000;
		globeColor = 'white';
		playingSequence = false;

		// To stop the background playback
		stopBackgroundPlayback();

		// Start the background playback
		if (!$beginnerMode) {
			startBackgroundPlayback();
		}
		startRound();
		setTimeout(() => {}, 2000);
	};
</script>

<div class="container" class:easy={$beginnerMode}>
	{#if initialLoad}
		<div class="start-container">
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
			{#if player && backgroundPlayer && backgroundPlayer2}
				<button
					class="start-button"
					on:click={() => {
						resetGame();
						initialLoad = false;
					}}>Start Game</button
				>
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
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
					on:change={(e) => {
						beginnerMode.set(e.target.checked);
						if (e.target.checked) {
							stopBackgroundPlayback();
						} else {
							startBackgroundPlayback();
						}
					}}
				/>
				<label for="beginnerMode">Beginner Mode</label>
			</div></small
		>
		{#if $beginnerMode}
			<div class="repeat-sequence-container">
				<button class="repeat-button" on:click={repeatCurrentSequence}>Repeat Sequence</button>
			</div>
		{/if}
		<div class="keyboard-container" class:inactive={playingSequence}>
			{#each notes as note, index}
				<KeyboardKey beginnerMode={$beginnerMode} b key={index} {note} onClick={handleNoteClick} />
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
		font-size: 2rem;
	}
	h2 {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
	}
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		width: 100vw;
		background-image: url('/mount_doom.gif');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		color: white;
	}
	.container.easy {
		background-image: none;
		color: #333;
		& .keyboard-container {
			transform: rotate(0) translate(0);
			gap: 0.2rem;
		}
	}
	.start-container {
		background: white;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: #333;
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
		/* background-color: rgba(255, 255, 255, 0.1); */
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.sequence-globe {
		width: 100px;
		height: 100px;
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

	.repeat-button {
		background-color: rgb(191, 223, 205);
		color: black;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.repeat-button:hover {
		background-color: rgba(98, 206, 145, 0.8);
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
		transition: transform 0.2s ease-in-out;
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
		position: absolute;
		bottom: 1rem;
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

	/* Base styles for mobile-first approach */
	.container {
		padding: 1rem;
		box-sizing: border-box;
	}

	.start-container,
	.sequence-container,
	.game-over-alert {
		padding: 1rem;
		max-width: 90%;
	}

	.start-button,
	.reset-button {
		padding: 0.5rem;
		font-size: 1rem;
	}

	.keyboard-container {
		/* grid-template-columns: repeat(4, 1fr); */
		transform: rotate(45deg) translate(3.5rem, 5rem);
		gap: 0.5rem;
	}

	.note-container {
		width: 100%;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	.note {
		width: 1.5rem;
		height: 1.5rem;
		font-size: 0.7rem;
	}

	/* Adjustments for larger screens */
	@media (min-width: 600px) {
		.start-container,
		.sequence-container,
		.game-over-alert {
			padding: 2rem;
		}

		.sequence-globe {
			width: 160px;
			height: 160px;
		}

		.start-button,
		.reset-button {
			padding: 0.5rem 1rem;
			font-size: 1.3rem;
		}

		.keyboard-container {
			transform: rotate(45deg) translate(-3.5rem, 5rem);
			grid-template-columns: repeat(7, 1fr);
			gap: 1rem;
		}

		.note-container {
			width: 600px;
			gap: 1rem;
			padding: 1rem;
		}

		.note {
			width: 2rem;
			height: 2rem;
			font-size: 0.8rem;
		}
	}

	/* Further adjustments for very small screens */
	@media (max-width: 320px) {
		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.start-container,
		.sequence-container,
		.game-over-alert {
			padding: 1rem;
		}

		.start-button,
		.reset-button {
			padding: 0.5rem;
			font-size: 0.9rem;
		}

		.keyboard-container {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}

		.note-container {
			gap: 0.3rem;
			padding: 0.3rem;
		}

		.note {
			width: 1rem;
			height: 1rem;
			font-size: 0.6rem;
		}
	}
</style>
