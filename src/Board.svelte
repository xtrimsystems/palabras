<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { speechSynthesis } from './Helpers/SpeechSynthesis.ts';

	import SelectCategory from './SelectCategory.svelte';
	import WinScreen from './WinScreen.svelte';
	import Panel from './Panel.svelte';
	import Word from './Word.svelte';

	let isWinScreenOpen = false;
	let stages = [];
	let index = 0;
	let initialLanguage = $configurationStore.language;
	let isInitialLoad = true;
	let totalStages = 0;
	let actualStage = 0;

	$: {
		if (stages.length > 0 && isInitialLoad) setPagination();
		else if (stages.length > 0) readOutLoudNextWord();
	}
	$: if ($configurationStore.language !== initialLanguage) resetGame();

	async function onInputChanged (event) {
		if(!event.data && !event.data.length) return;
		const char = event.data[event.data.length - 1];
		if (!char) return;
		const word = stages[0].word;

		// Trick so the keyboard on smartphones is on caps or not
		event.srcElement.value = $configurationStore.isMiniLetterActive ? 'a': '';

		if ($configurationStore.isConfigurationOpen) return;

		if (char.toLowerCase() !== word[index].toLowerCase()) return;

		if (++index === word.length) {
			await showWinScreen(5000);
			index = 0;
			stages = [...stages.splice(1, stages.length)];
			actualStage++;

			if (stages.length === 0) {
				resetGame();
			}
		} else {
			readOutLoudNextLetter();
		}
	}

	async function showWinScreen (duration: number) {
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
			speechSynthesis.readOutLoud(
				`${$i18nStore.texts.theWordToWriteIs} ${word}`,
				`${$i18nStore.texts.pressLetter} ${letter}`
			);
		}
	}

	function resetGame () {
		speechSynthesis.cancelReading();
		initialLanguage = $configurationStore.language;
		index = 0;
		stages = [];
		isInitialLoad = true;
		totalStages = 0;
		actualStage = 0;
	}

	function setPagination() {
		isInitialLoad = false;
		totalStages = stages.length;
		actualStage = 1;
	}
</script>

<Panel>
	{#if stages.length === 0}
		<SelectCategory bind:stages="{stages}" />
	{:else if isWinScreenOpen}
		<WinScreen />
	{:else}
		<div>
			<input
				class="visibleButHidden"
				on:input={onInputChanged}
				on:blur={function () { this.focus() }}
				autofocus
				type="text"
				value="{$configurationStore.isMiniLetterActive ? 'a' : ''}"
			/>

			<Word
				value="{stages[0].word}"
				index="{index}"
				isMiniLetterActive="{$configurationStore.isMiniLetterActive}"
			/>

			<div class="image">
				<img src="{stages[0].imageBase64}" alt="{stages[0].word}">
			</div>

			<div class="pagination">
				<div class="progress">
					<div class="progress-bar bg-primary" role="progressbar" style="width: {((actualStage-1)/totalStages)*100}%" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
				<span class="pagination-numbers">{actualStage}/{totalStages}</span>
			</div>
			<button class="btn btn-secondary btn-lg" on:click="{readOutLoudNextLetter}">{$i18nStore.texts.repeatLetter}</button>
			<button class="btn btn-primary btn-lg" on:click="{resetGame}">{$i18nStore.texts.backToMenu}</button>
		</div>
	{/if}
</Panel>

<style>
	.pagination {
		display: flex;
		position: relative;
		padding-bottom: 1rem;
	}
	.progress {
		width: 100%;
	}
	.pagination-numbers {
		position: absolute;
		right: 0;
		line-height: 1.2rem;
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
