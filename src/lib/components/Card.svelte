<script>
	import { showNotes } from '$lib/stores';

	export let card;
	export let index;
	export let difficulty;
	export let handleCardClick;
</script>

<div
	key={index}
	class="card"
	class:matched={card.matched === true}
	class:revealed={card.revealed === true}
	style="width: calc(40vw / {difficulty}); height: calc(40vw / {difficulty});"
	on:click={() => handleCardClick(card)}
	on:keydown={(event) => {
		if (event.key === 'Enter') {
			handleCardClick(card);
		}
	}}
	aria-label={card.note}
	role="button"
	tabindex={index}
>
	<div class="card-inner">
		<div class="card-front">
			<!-- <p>{card.sound}</p> -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path
					fill="currentColor"
					d="M10 21q-1.65 0-2.825-1.175T6 17t1.175-2.825T10 13q.575 0 1.063.138t.937.412V3h6v4h-4v10q0 1.65-1.175 2.825T10 21"
				/>
			</svg>
		</div>
		<div class="card-back">
			{#if $showNotes}
				<p>{card.sound}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		/* min-width: 100px;
		min-height: 100px; */
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		perspective: 1000px;
	}
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;

		transform-style: preserve-3d;
		transition: all 0.6s;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
	}
	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Courier New', Courier, monospace;
		font-size: 1.4rem;
		color: #444;
	}
	.card-front {
		background-color: lightgray;
		transform: rotateY(0deg);
		color: rgba(255, 255, 255, 0.5);
	}
	.card-back {
		background-color: rgb(229, 229, 151);
		transform: rotateY(180deg);
	}
	.card:hover .card-inner {
		transform: translateZ(1%);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
	}
	.card.revealed .card-inner {
		transform: rotateY(180deg);
	}
	.card.matched .card-back {
		transform: rotateY(180deg);
		background-color: rgb(99, 169, 130);
		color: #eee;
	}
</style>
