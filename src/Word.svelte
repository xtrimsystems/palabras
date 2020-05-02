<script lang="ts">
    export let value = 'demo';
    export let index = 2;
    export let isMiniLetterActive = false;

</script>
<div class="word">
    {#each value as letter, i}
		<div class="letter"
		     class:isActive="{i === index}"
		     class:isGuessed="{i < index}">
			<div class:isMiniLetterActive={isMiniLetterActive}>
                {letter}
			</div>
		</div>
    {/each}
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
		padding-bottom: 10px;
		box-sizing: border-box;
		border-bottom: 5px solid transparent;
		position: relative;
		font-size: 2.5rem;
		line-height: 1;
		text-transform: uppercase;
	}
	.isMiniLetterActive {
		text-transform: lowercase;
	}
	.letter.isActive {
		border-bottom: 5px solid var(--darkBackgroundColor);
	}
	.letter.isGuessed {
		color: var(--mainBackgroundColor);
	}
</style>
