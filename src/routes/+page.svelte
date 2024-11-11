<div class="container">
	<ul>
		<li class="memory">
			<a href="./soundmemory">
				<img src="/memory_logo.png" alt="Sound Memory" />
				<h2>Sound Memory</h2>
				<p>Play Memory - with your EAR! 🤯</p>
			</a>
		</li>
		<li class="sequence">
			<a href="./sequenceofdoom">
				<img src="/mount_doom.gif" alt="Sequence of Doom" />
				<h2>Sequence of Doom</h2>
				<p>Help Frodo to follow the sequence of Doom! 🧙‍♂️</p>
			</a>
		</li>
	</ul>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	ul {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		list-style: none;
		padding: 0;
		margin: 0;
		/* gap: 1rem; */
		overflow-x: hidden;
		background-color: rgba(230, 244, 247, 0.518);
	}
	li {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease-in-out;
	}
	li:hover {
		transform: rotateZ(2deg);
	}
	a {
		color: rgb(22, 22, 22);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		& img {
			width: 140px;
			height: 140px;
			margin-bottom: 1rem;
			object-fit: cover;
		}
	}
	a:hover {
		transform: scale(1.05);
	}
	.memory {
		background-color: rgba(230, 244, 247, 0.518);
		color: rgb(22, 22, 22);
	}
	.sequence {
		background-color: rgba(247, 230, 230, 0.518);
		color: rgb(22, 22, 22);
	}
	@media (max-width: 600px) {
		ul {
			flex-direction: column;
			overflow-y: auto;
		}
		li {
			flex: 1;
			height: auto;
			width: 100%;
			padding: 1rem;
			box-sizing: border-box;
		}
		a {
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			padding: 1rem;
			box-sizing: border-box;
		}
	}
</style>
