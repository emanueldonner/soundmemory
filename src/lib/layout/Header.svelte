<script>
	import { showNotes, instrument } from '$lib/stores';

	export let mode;
	export let modes;
	export let switchMode;
	export let selectInstrument;
	export let instrumentList;
	export let difficulties;
	export let switchDifficulty;

	$: localShowNotes = $showNotes;
	$: localInstrument = $instrument;
</script>

<div class="header">
	<div class="title">
		<h1>You have got to LISTEN!</h1>
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
		<div class="show-notes">
			<input
				type="checkbox"
				name="shownote"
				id="shownote"
				bind:checked={localShowNotes}
				on:change={() => showNotes.set(localShowNotes)}
			/>
			<label for="shownote">Show notes</label>
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
		padding: 1rem;
		box-sizing: border-box;
		/* background: rgba(60, 92, 86, 0.351); */
	}
	.title {
		/* font-size: 1rem; */
		& h1 {
			margin: 0;
		}
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
		font-size: 0.9rem;
	}
	input[type='checkbox'] {
		display: none;
	}
	input[type='checkbox']:checked + label {
		background-color: rgb(144, 231, 182);
		color: black;
	}
	label {
		padding: 0.5rem 1rem;
		cursor: pointer;
		background-color: rgba(100, 100, 100, 0.1);
		font-size: 0.9rem;
	}
</style>
