<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { Difficulties } from './Domain/Configuration.ts';

	export let stage;
	export let index;
	export let difficulty = Difficulties.EASY;
	export let isDemo = false;
</script>

<div class="card">
	<div class="card-body word">
		{#each stage.word as letter, i}
			<div class="letter"
				 class:isActive="{i === index}"
				 class:isGuessed="{i < index}"
				 class:isDemo>
				<span class="normal-letter">
					{letter}
				</span>
				{#if $configurationStore.isMiniLetterActive}
					<span class="mini-letter">
						{letter}
					</span>
				{/if}
			</div>
		{/each}
	</div>
	{#if !isDemo && difficulty === Difficulties.EASY}
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
		position: relative;
	}
	.normal-letter {
		font-size: 100px;
		line-height: 1;
		text-transform: uppercase;
	}
	.mini-letter {
		font-size: 30px;
		position: absolute;
		bottom: 0;
		right: 2px;
		line-height: 1;
		text-transform: lowercase;
	}
	.isDemo.letter {
		min-width: 70px;
		min-height: 70px;
	}
	.isDemo .normal-letter {
		font-size: 40px;
	}
	.isDemo .mini-letter {
		font-size: 16px;
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
