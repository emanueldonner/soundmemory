<script>
	export let mode;
	export let modes;
	export let switchMode;
	export let selectedInstrument;
	export let showNotes;
	export let selectInstrument;
	export let instrumentList;
	export let difficulties;
	export let switchDifficulty;
</script>

<div class="header">
	<div class="title">
		<h2>You have got to LISTEN!</h2>
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

		<select bind:value={selectedInstrument} on:change={selectInstrument}>
			{#each instrumentList as instrument}
				<option value={instrument}>{instrument}</option>
			{/each}
		</select>
		<div class="show-notes">
			<input type="checkbox" name="shownote" id="shownote" bind:checked={showNotes} />
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
		background: rgba(60, 92, 86, 0.351);
	}
	.title {
		font-size: 1rem;
		& h2 {
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
</style>
