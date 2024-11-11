<script>
	import { showNotes, instrument, noteLength } from '$lib/stores';

	export let mode;
	export let modes;
	export let switchMode;
	export let selectInstrument;
	export let instrumentList;
	export let difficulties;
	export let switchDifficulty;

	$: localShowNotes = $showNotes;
	$: localInstrument = $instrument;
	$: localNoteLength = $noteLength;
</script>

<div class="header">
	<div class="title">
		<div class="logo">
			<img src="/memory_logo.png" alt="logo" />
		</div>
		<h2>Sound Memory</h2>
	</div>
	<div class="settings">
		<!-- <select value={mode} on:change={(e) => switchMode(e.target.value)}>
			{#each modes as mode}
				<option value={mode}>{mode}</option>
			{/each}
		</select> -->
		<select value={4} on:change={(e) => switchDifficulty(e.target.value)}>
			{#each Object.keys(difficulties) as diff}
				<option value={difficulties[diff]}>{diff}</option>
			{/each}
		</select>

		<select bind:value={localInstrument} on:change={(e) => instrument.set(e.target.value)}>
			{#each instrumentList as instrument}
				<option value={instrument}>{instrument}</option>
			{/each}
		</select>

		<!-- slider for note length -->
		<div class="slider-container">
			<label for="noteLength">Note length:</label>
			<input
				type="range"
				min="100"
				max="4000"
				step="1"
				bind:value={localNoteLength}
				on:input={(e) => noteLength.set(e.target.value)}
			/>
			<span>{localNoteLength} ms</span>
		</div>
		<div class="show-notes">
			<input
				type="checkbox"
				name="shownote"
				id="shownote"
				bind:checked={localShowNotes}
				on:change={() => showNotes.set(localShowNotes)}
			/>
			<label class="show-notes-label" for="shownote">Show notes</label>
		</div>
	</div>
</div>

<style>
	.header {
		width: 100vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 2rem;
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.9rem;
		& h2 {
			margin: 0;
		}
	}
	.logo {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo img {
		width: 100%;
		height: 100%;
	}
	.settings {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	select {
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: 'Montserrat', sans-serif;
		font-size: 0.9rem;
	}

	.slider-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.2rem;
		& span {
			font-family: 'Courier New', Courier, monospace;
			width: 5rem;
		}
	}
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
	}
	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-moz-range-track {
		background: #4d4d4d7b;
		height: 0.2rem;
	}
	input[type='range']::-webkit-slider-thumb,
	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -12px; /* Centers thumb on the track */
		background-color: rgb(144, 231, 182);
		border: 1px solid #f8f7f4;
		border-radius: 0;
		height: 0.7rem;
		width: 0.7rem;
	}
	input[type='range']:focus {
		outline: none;
	}

	input[type='range']:focus::-webkit-slider-thumb,
	input[type='range']:focus::-moz-range-thumb {
		border: 1px solid #053a5f;
		outline: 1px solid #053a5f;
		outline-offset: 0.125rem;
	}

	input[type='checkbox'] {
		display: none;
	}
	input[type='checkbox']:checked + .show-notes-label {
		background-color: rgb(144, 231, 182);
		color: black;
	}
	.show-notes-label {
		padding: 0.5rem 1rem;
		cursor: pointer;
		background-color: rgba(100, 100, 100, 0.1);
		font-size: 0.9rem;
	}
</style>
