<script lang="ts">
	export let stage;
	export let index;
	export let difficulty;
</script>

<div class="card">
	<div class="card-body word">
		{#each stage.word as letter, i}
			<span class="letter"
				  class:isActive="{i === index}"
				  class:isGuessed="{i < index}">
				{letter}
			</span>
		{/each}
	</div>
	{#if difficulty === 'Facil'}
		<div class="card-image image">
			<img src="{stage.image}" alt="{stage.word}">
		</div>
	{/if}
</div>

<style>
	.word {
		display: flex;
		justify-content: center;
	}
	.letter {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 130px;
		min-height: 130px;
		margin: 0 5px;
		box-sizing: border-box;
		border: 1px solid var(--lightBackgroundColor);
		font-size: 100px;
		line-height: 1;
		text-transform: uppercase;
	}
	.isActive {
		border: 5px solid var(--darkBackgroundColor);
	}
	.isGuessed {
		color: var(--mainBackgroundColor);
	}
	.image {
		text-align: center;
	}
	img {
		max-height: 600px;
	}
</style>
