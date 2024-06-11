<div class="main-container">
	<div class="nav-bar">
		<div class="title">
			<div class="logo">
				<img src="/note_logo.png" alt="logo" />
			</div>
			<h1>You have got to LISTEN!</h1>
		</div>
		<div class="menu">
			<a href="/">Home</a>
			<a href="/soundmemory">Sound Memory</a>
			<a href="/sequenceofdoom">Sequence of Doom</a>
		</div>
	</div>
	<slot />
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100vh;
	}
	.nav-bar {
		width: 100vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 2rem;
		box-sizing: border-box;
		/* background: rgba(255, 201, 201, 0.351); */
	}
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.9rem;

		& h1 {
			margin: 0;
		}
	}
	.logo {
		width: 32px;
		height: 32px;
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
</style>
