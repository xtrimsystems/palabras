<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';

	export let stage;
	export let index;
	export let isDemo = false;
</script>

<div>
	<div class="word">
		{#each stage.word as letter, i}
			<div class="letter"
				 class:isActive="{i === index}"
				 class:isGuessed="{i < index}"
				 class:isDemo>
				<div class="normal-letter">
					{letter}
				</div>
				{#if $configurationStore.isMiniLetterActive}
					<div class="mini-letter">
						{letter}
					</div>
				{/if}
			</div>
		{/each}
	</div>
	{#if !isDemo}
		<div class="image">
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
		flex: 1 0 auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 5px;
		box-sizing: border-box;
		border-bottom: 5px solid transparent;
		position: relative;
	}
	.letter.isActive {
		 border-bottom: 5px solid var(--darkBackgroundColor);
	 }
	.letter.isGuessed {
		color: var(--mainBackgroundColor);
	}
	.normal-letter {
		line-height: 1;
		text-transform: uppercase;
		font-size: 2.5rem;
	}
	.mini-letter {
		text-transform: lowercase;
	}
	.image {
		text-align: center;
		margin: 15px 0;
	}
	img {
		max-height: 500px;
	}
	@media (max-width: 575.98px) {
		img {
			width: 100%;
			max-height: none;
		}
	}
</style>
