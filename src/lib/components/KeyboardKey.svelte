<script>
	import NoteLabel from './NoteLabel.svelte';

	export let note;
	export let onClick;
	export let beginnerMode;
	export let moveDelay;

	$: randomAngle = Math.random() * 20; // 0 to 20 degrees
	$: randomX = Math.random() * 5 - 2.5; // -2.5 to 2.5
	$: randomY = Math.random() * 5 - 2.5; // -2.5 to 2.5
	$: randomScale = 1 + Math.random() * 0.5; // 1 to 1.5

	const handleClick = () => {
		onClick(note);
	};
</script>

<button
	class="keyboard-key {note.type}-key"
	class:easy={beginnerMode}
	style="background-color: {note.color}; --move-delay: {moveDelay}ms;--random-x: {randomX}; 
		--random-y: {randomY};
		--translateX-offset: {note.type === 'black' ? '50%' : '0'};
	"
	on:click={handleClick}
>
	<div class="key-label">
		<NoteLabel {note} />
	</div>
</button>

<style>
	@keyframes moveKeyBlack {
		0% {
			transform: translate(calc(50%), 0) scale(1);
			opacity: 1;
			filter: blur(0px);
		}
		25% {
			transform: translate(calc(50% + 50% + var(--random-x) * 10px), calc(var(--random-y) * 20px))
				scaleY(1.1);
			opacity: 0.8;
		}
		50% {
			transform: translate(calc(50% + 50% + var(--random-x) * 20px), calc(var(--random-y) * 10px))
				scaleY(1.6);
			opacity: 0.6;
			filter: blur(6px);
		}
		75% {
			transform: translate(calc(50% + 50% + var(--random-x) * 10px), calc(var(--random-y) * 20px))
				scaleY(1.1) scaleX(1.6);
			opacity: 0.8;
		}
		100% {
			transform: translate(calc(50%), 0) scale(1);
			opacity: 1;
			filter: blur(0px);
		}
	}
	@keyframes moveKeyWhite {
		0% {
			transform: translate(0, 0) scale(1);
			opacity: 1;
			filter: blur(0px);
		}
		25% {
			transform: translate(calc(50% + var(--random-x) * 10px), calc(var(--random-y) * 10px))
				scaleY(1.2) scaleX(1.8);
			opacity: 0.8;
		}
		50% {
			transform: translate(calc(50% + var(--random-x) * 20px), calc(var(--random-y) * 20px))
				scaleY(1.6);
			opacity: 0.6;
			filter: blur(6px);
		}
		75% {
			transform: translate(calc(50% + var(--random-x) * 10px), calc(var(--random-y) * 10px))
				scaleY(1.1);
			opacity: 0.8;
		}
		100% {
			transform: translate(0, 0) scale(1);
			opacity: 1;
			filter: blur(0px);
		}
	}

	/* @keyframes moveKey {
		0% {
			transform: rotateZ(0) scaleY(1);
			border-radius: 20%;
			opacity: 1;
			filter: blur(0);
		}
		50% {
			transform: rotateZ(40deg) scaleY(2);
			border-radius: 0;
			opacity: 0.5;
			filter: blur(6px);
		}
		100% {
			transform: rotateZ(0) scaleY(1);
			border-radius: 20%;
			opacity: 1;
			filter: blur(0);
		}
	} */
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
		animation: moveKeyWhite 10000ms linear infinite;
		mix-blend-mode: difference;
	}
	.keyboard-key.easy {
		height: 140px;
		animation: none;
	}
	.keyboard-key:hover {
		box-shadow: 0 0 8px 10px rgba(255, 255, 255, 0.8);
	}

	.black-key {
		transform: translateX(50%);
		animation: moveKeyBlack 10000ms 300ms linear infinite;
	}

	/* Adjustments for larger screens */
	@media (min-width: 900px) {
		.keyboard-key {
			width: 80px;
			height: 80px;
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
