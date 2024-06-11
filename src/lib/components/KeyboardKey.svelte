<script>
	import NoteLabel from './NoteLabel.svelte';
	export let note;
	export let onClick;
	const handleClick = () => {
		onClick(note);
	};
</script>

<button
	class="keyboard-key {note.type}-key"
	style="background-color: {note.color}"
	on:click={handleClick}
>
	<div class="key-label">
		<NoteLabel {note} />
	</div>
</button>

<style>
	.keyboard-key {
		/* position: relative; */
		width: 100px;
		height: 100px;
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		color: #fff;
		cursor: pointer;
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease-in-out;
		transform-style: preserve-3d;
	}
	.keyboard-key:hover {
		/* transform: scale(1.1); */
		box-shadow: 0 0 8px 10px rgba(255, 255, 255, 0.8);
	}

	.black-key {
		/* position: absolute; */
		transform: translateX(50%);
	}
</style>
