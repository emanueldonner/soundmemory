<script>
	import NoteLabel from './NoteLabel.svelte';

	export let note;
	export let onClick;
	export let beginnerMode;
	const handleClick = () => {
		onClick(note);
	};
</script>

<button
	class="keyboard-key {note.type}-key"
	class:easy={beginnerMode}
	style="background-color: {note.color}"
	on:click={handleClick}
>
	<div class="key-label">
		<NoteLabel {note} />
	</div>
</button>

<style>
	/* Base styles for mobile-first approach */
	.keyboard-key {
		width: 50px;
		height: 100px;
		border: none;
		border-radius: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		color: #fff;
		cursor: pointer;
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease-in-out;
		transform-style: preserve-3d;
	}
	.keyboard-key.easy {
		height: 140px;
	}
	.keyboard-key:hover {
		box-shadow: 0 0 8px 10px rgba(255, 255, 255, 0.8);
	}

	.black-key {
		transform: translateX(50%);
	}

	/* Adjustments for larger screens */
	@media (min-width: 900px) {
		.keyboard-key {
			width: 100px;
			height: 100px;
			font-size: 1.2rem;
		}
	}

	/* Further adjustments for very small screens */
	@media (max-width: 320px) {
		.keyboard-key {
			width: 40px;
			height: 40px;
			font-size: 0.8rem;
		}
	}
</style>
