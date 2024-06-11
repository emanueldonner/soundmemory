<div class="main-container">
	<slot />
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		height: 100vh;
	}
</style>
