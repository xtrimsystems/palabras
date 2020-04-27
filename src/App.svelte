<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { CssVars } from './Helpers/CssVars.ts';
	import { ColorThemeBuilder } from './Helpers/ColorThemeBuilder.ts';
	import { speechSynthesis } from './Helpers/SpeechSynthesis.ts'
	import { indexedDB } from './IndexDB/IndexedDB.ts'

	import Configuration from './Configuration.svelte';
	import Board from './Board.svelte';
	import SelectCategory from './SelectCategory.svelte';
	import WinScreen from './WinScreen.svelte';

	let stages = [];
	let voices: SpeechSynthesisVoice[] = [];
	let stage = -1;
	let index = 0;
	let winScreenIsOpen = false;
	let colorTheme;
	let initialLanguage = $configurationStore.language;
	let newCategoryName;

	speechSynthesis.addEventListener('onLoad', (e, data) => {
		speechSynthesis.setVoice($configurationStore.language);
		voices = data;
	});

	$: speechSynthesis.setVoice($configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);
	$: if (stages.length > 0) startGame();
	$: if ($configurationStore.language !== initialLanguage) {
		resetGame();
	}

	async function onInputChanged (event) {
		const char = event.data;

		event.srcElement.value = '';

		if (!char) return;

		if (stage === -1) return;

		const word = stages[stage].word;

		if (char.toLowerCase() !== word[index]) return;

		if (++index === word.length) {
			await showWinScreen(5000);
			index = 0;
			stage++;

			if (stage < stages.length) {
				readOutLoudNextWord();
			} else if (stage === stages.length) {
				resetGame();
			}
		} else {
			readOutLoudNextLetter();
		}
	}

	async function showWinScreen(duration: number) {
		window.speechSynthesis.cancel();
		winScreenIsOpen = true;
		await new Promise((resolve) => setTimeout(() => {
			winScreenIsOpen = false;
			resolve();
		}, duration));
	}

	function readOutLoudNextLetter () {
		const letter = stages[stage].word[index];
		if (typeof letter !== 'undefined') {
			speechSynthesis.readOutLoud(`${$i18nStore.texts.pressLetter} ${letter}`);
		}
	}

	function readOutLoudNextWord () {
		const word = stages[stage].word;
		const letter = stages[stage].word[index];

		if (typeof word !== 'undefined' && typeof letter !== 'undefined') {
			speechSynthesis.readOutLoud(`${$i18nStore.texts.theWordToWriteIs} ${word}`, `${$i18nStore.texts.pressLetter} ${letter}`);
		}
	}

	function startGame () {
		stage = 0;
		index = 0;
		readOutLoudNextWord();
	}

	function resetGame () {
		initialLanguage = $configurationStore.language;
		index = 0;
		stage = -1;
		stages = [];
	}

	async function createNewCategory() {
		if (typeof newCategoryName !== 'undefined' && newCategoryName !== '') {
			try {
				const id = await indexedDB.addCategory(newCategoryName);

				customCategoriesStore.addCategory({ id, name: newCategoryName});

			} catch (e) {
				console.log(e);
			}

			newCategoryName = '';
		}
	}
</script>

<svelte:head>
	<title>{$i18nStore.texts.appName}</title>
</svelte:head>

<main use:CssVars="{colorTheme}" class="container-xl">
{#if voices.length > 0}
	{#if winScreenIsOpen}
		<WinScreen />
	{:else}
		{#if stages.length === 0 && !$configurationStore.isConfigurationOpen}
			<SelectCategory bind:stages="{stages}" />
			<input bind:value={newCategoryName} type="text" />
			<button on:click={createNewCategory} class="btn btn-primary btn-lg btn-block">Create Custom Category</button>
		{/if}
		{#if stage !== -1 && !$configurationStore.isConfigurationOpen}
			<input class="visible-but-hidden" on:input={onInputChanged} on:blur={function () { this.focus() }} autofocus type="text" />
			<Board
					stage="{stages[stage]}"
					index="{index}"
			/>
			<button class="btn btn-primary btn-lg" on:click="{readOutLoudNextLetter}">{$i18nStore.texts.repeatLetter}</button>
		{/if}
		{#if $configurationStore.isConfigurationOpen}
			<Configuration voices="{voices}" />
		{:else}
			<button class="btn btn-primary btn-lg" on:click={() => configurationStore.openConfiguration()}>⚙</button>
		{/if}
	{/if}
{:else}
	<button on:click={() => speechSynthesis.readOutLoud($i18nStore.texts.letsStart)} class="btn btn-primary btn-lg btn-block">{$i18nStore.texts.start}</button>
{/if}
</main>

<style>
	main {
		padding: 1em;
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
	}
	.visible-but-hidden {
		position: absolute;
		left: -99999px;
		width: 0;
		height: 0;
	}
</style>
