<script>
	import { onMount } from 'svelte';
	import Soundfont from 'soundfont-player';
	import { instrument, noteLength } from '$lib/stores';
	import Card from '../../lib/components/Card.svelte';
	import Header from '../../lib/layout/Header.svelte';

	let audioContext;
	let player;
	let cards = [];
	let firstCard = null;
	let secondCard = null;

	const instrumentList = [
		'acoustic_grand_piano',
		'electric_piano_1',
		'glockenspiel',
		'slap_bass_1',
		'violin',
		'trumpet',
		'tenor_sax',
		'fx_3_crystal',
		'tinkle_bell'
	];

	const notes = [
		'C3',
		'C#3',
		'D3',
		'D#3',
		'E3',
		'F3',
		'F#3',
		'G3',
		'G#3',
		'A3',
		'A#3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
		'C5'
	];
	const intervals = [
		{ name: 'Perfect Unison', interval: 0 },
		{ name: 'Minor Second', interval: 1 },
		{ name: 'Major Second', interval: 2 },
		{ name: 'Minor Third', interval: 3 },
		{ name: 'Major Third', interval: 4 },
		{ name: 'Perfect Fourth', interval: 5 },
		{ name: 'Tritone', interval: 6 },
		{ name: 'Perfect Fifth', interval: 7 },
		{ name: 'Minor Sixth', interval: 8 },
		{ name: 'Major Sixth', interval: 9 },
		{ name: 'Minor Seventh', interval: 10 },
		{ name: 'Major Seventh', interval: 11 },
		{ name: 'Octave', interval: 12 },
		{ name: 'Minor Ninth', interval: 13 },
		{ name: 'Major Ninth', interval: 14 },
		{ name: 'Minor Tenth', interval: 15 },
		{ name: 'Major Tenth', interval: 16 },
		{ name: 'Perfect Eleventh', interval: 17 },
		{ name: 'Perfect Twelfth', interval: 18 }
	];
	let notesArray = [];
	let cardSounds = [];
	const modes = ['notes', 'intervals', 'chords'];
	let mode = 'notes';
	const difficulties = {
		small: 2,
		medium: 4,
		large: 6
	};
	let difficulty = 4;
	let tryCounter = 0;
	let matches = 0;
	let showWinMessage = false;

	onMount(() => {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
		Soundfont.instrument(audioContext, $instrument).then((piano) => {
			player = piano;
			generateCards();
		});
		instrument.subscribe((value) => {
			selectInstrument();
		});
	});

	const switchMode = (NewMode) => {
		mode = NewMode;
		resetGame();
	};

	const switchDifficulty = (NewDifficulty) => {
		difficulty = NewDifficulty;
		resetGame();
	};

	const shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		return array;
	};

	const generateCards = () => {
		// take diffulty value as number for the amount of notes
		let amountOfNotes = (parseInt(difficulty) * parseInt(difficulty)) / 2;
		// Randomize order of notes
		let shuffledNotes = shuffle(notes);
		// truncate the notes array based on the amount of notes
		notesArray = shuffledNotes.slice(0, amountOfNotes);

		switch (mode) {
			case 'intervals':
				cardSounds = generateIntervalCards(amountOfNotes);
				break;
			case 'chords':
				cardSounds = generateChordCards(chords);
				break;
			default:
				cardSounds = [...notesArray, ...notesArray];
		}

		cardSounds = [...notesArray, ...notesArray];
		cardSounds.sort(() => Math.random() - 0.5);
		cards = cardSounds.map((sound, index) => ({
			sound,
			id: index,
			matched: false,
			revealed: false
		}));
	};

	const generateIntervalCards = (amountOfNotes) => {
		cardSounds = [];
		for (let i = 0; i < amountOfNotes; i++) {
			const note1 = notes[i % notes.length];
			const interval = intervals[i % intervals.length];
			const note2 = notes[(i + interval.steps) % notes.length];
			cardSounds.push({ note1, note2, interval: interval.name });
		}
		cardSounds = [...cardSounds, ...cardSounds];
		return cardSounds;
	};

	const handleCardClick = (card) => {
		if ((firstCard && secondCard) || card.revealed || card.matched) return;

		card.revealed = true;
		playSound(card.sound);

		if (!firstCard) {
			firstCard = card;
		} else if (!secondCard) {
			secondCard = card;
			checkForMatch();
		}
		cards = [...cards];
	};

	const checkForMatch = () => {
		tryCounter++;
		let isMatch = false;
		switch (mode) {
			case 'intervals':
				isMatch = firstCard.sound.interval === secondCard.sound.interval;
				break;
			case 'chords':
				isMatch = firstCard.sound.chord.name === secondCard.sound.chord.name;
				break;
			default:
				isMatch = firstCard.sound === secondCard.sound;
		}
		if (isMatch) {
			firstCard.matched = true;
			secondCard.matched = true;
			matches++;
			cards = [...cards];
			checkForWin();
			resetCards();
		} else {
			setTimeout(() => {
				firstCard.revealed = false;
				secondCard.revealed = false;
				cards = [...cards];
				resetCards();
			}, 1000);
		}
	};

	const checkForWin = () => {
		if (matches === notesArray.length) {
			showWinMessage = true;
		}
	};

	const resetCards = () => {
		firstCard = null;
		secondCard = null;
	};

	const playSound = (sound) => {
		if (player && player.play) {
			switch (mode) {
				case 'intervals':
					player.play(sound.note1);
					setTimeout(() => player.play(sound.note2), 1000);
					break;
				case 'chords':
					sound.notes.forEach((note) => player.play(note));
					break;
				default:
					player.play(sound);
					setTimeout(() => player.stop(), $noteLength);
			}
		}
	};

	const resetGame = () => {
		resetCards();
		matches = 0;
		tryCounter = 0;
		showWinMessage = false;
		generateCards();
	};
	const selectInstrument = () => {
		player = Soundfont.instrument(audioContext, $instrument).then((piano) => {
			player = piano;
		});
	};
</script>

<div class="container">
	<Header
		{mode}
		{modes}
		{switchMode}
		{difficulty}
		{generateCards}
		{selectInstrument}
		{instrumentList}
		{difficulties}
		{switchDifficulty}
	/>
	<div class="game-container">
		<div class="counter-container">
			<div class="try-counter">
				<span>Tries: {tryCounter}</span>

				<span>Matches: {matches}</span>
			</div>
		</div>

		{#if showWinMessage}
			<div class="win-message">
				<h2>You win!</h2>
				<p>It took you {tryCounter} tries to match the {notesArray.length} notes.</p>
				<button
					class="reset-button"
					on:click={() => {
						resetGame();
					}}
				>
					Play again
				</button>
			</div>
		{/if}
		<div class="grid-container">
			<div class="grid" style="grid-template-columns: repeat({difficulty}, auto)">
				{#each cards as card, index (card.id)}
					<Card {card} {index} {difficulty} {handleCardClick} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		height: 100vh;
		background: #f8f7f4;
	}

	.game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		flex: 1;
		width: 100%;
	}
	.grid-container {
		/* flex: 1; */
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.grid {
		display: grid;
		/* grid-template-columns: repeat(4, 100px); */
		grid-gap: 10px;
	}

	.win-message {
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
		background-color: rgba(48, 137, 87, 0.96);
		padding: 1rem;
		z-index: 100;
	}
	.reset-button {
		background-color: rgb(144, 231, 182);
		color: black;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.reset-button:hover {
		background-color: rgba(10, 160, 75, 0.8);
	}
</style>
