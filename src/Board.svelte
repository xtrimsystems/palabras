<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { speechSynthesis } from './Helpers/SpeechSynthesis.ts';

	import SelectCategory from './SelectCategory.svelte';
	import WinScreen from './WinScreen.svelte';

	export let isDemo = false;
	let isWinScreenOpen = false;
	let stages = [];
	let index = 0;
	let initialLanguage = $configurationStore.language;

	$: if (stages.length > 0) readOutLoudNextWord();
	$: if ($configurationStore.language !== initialLanguage) {
		resetGame();
	}

	async function onInputChanged (event) {
		const char = event.data;
		if (!char) return;
		const word = stages[0].word;

		event.srcElement.value = '';

		if ($configurationStore.isConfigurationOpen) return;

		if (char.toLowerCase() !== word[index]) return;

		if (++index === word.length) {
			await showWinScreen(5000);
			index = 0;
			stages = [...stages.splice(1, stages.length)];

			if (stages.length === 0) {
				resetGame();
			}
		} else {
			readOutLoudNextLetter();
		}
	}

	async function showWinScreen(duration: number) {
		speechSynthesis.cancelReading();
		isWinScreenOpen = true;
		await new Promise((resolve) => setTimeout(() => {
			isWinScreenOpen = false;
			resolve();
		}, duration));
	}

	function readOutLoudNextLetter () {
		const letter = stages[0].word[index];
		if (typeof letter !== 'undefined') {
			speechSynthesis.readOutLoud(`${$i18nStore.texts.pressLetter} ${letter}`);
		}
	}

	function readOutLoudNextWord () {
		const word = stages[0].word;
		const letter = stages[0].word[index];

		if (typeof word !== 'undefined' && typeof letter !== 'undefined') {
			speechSynthesis.readOutLoud(`${$i18nStore.texts.theWordToWriteIs} ${word}`, `${$i18nStore.texts.pressLetter} ${letter}`);
		}
	}

	function resetGame () {
		speechSynthesis.cancelReading();
		initialLanguage = $configurationStore.language;
		index = 0;
		stages = [];
	}
</script>
{#if isDemo}
	<div class="word">
		<div class="letter isGuessed"><div class="normal-letter">d</div>{#if $configurationStore.isMiniLetterActive}<div class="mini-letter">d</div>{/if}</div>
		<div class="letter isActive"><div class="normal-letter">e</div>{#if $configurationStore.isMiniLetterActive}<div class="mini-letter">e</div>{/if}</div>
		<div class="letter"><div class="normal-letter">m</div>{#if $configurationStore.isMiniLetterActive}<div class="mini-letter">m</div>{/if}</div>
		<div class="letter"><div class="normal-letter">o</div>{#if $configurationStore.isMiniLetterActive}<div class="mini-letter">o</div>{/if}</div>
	</div>
{:else}
	{#if stages.length === 0}
		<SelectCategory bind:stages="{stages}" />
	{:else if isWinScreenOpen}
		<WinScreen />
	{:else}
		<div>
			<input class="visible-but-hidden" on:input={onInputChanged} on:blur={function () { this.focus() }} autofocus type="text" />
			<div class="word">
				{#each stages[0].word as letter, i}
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

			<div class="image">
				<img src="{stages[0].image}" alt="{stages[0].word}">
			</div>
			<button class="btn btn-secondary btn-lg" on:click="{readOutLoudNextLetter}">{$i18nStore.texts.repeatLetter}</button>
			<button class="btn btn-primary btn-lg" on:click="{resetGame}">{$i18nStore.texts.backToMenu}</button>
		</div>
	{/if}
{/if}

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
	.visible-but-hidden {
		position: absolute;
		left: -99999px;
		width: 0;
		height: 0;
	}
</style>
