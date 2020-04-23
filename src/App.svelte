<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { CssVars } from './Helpers/CssVars.ts';
	import { ColorThemeBuilder } from './Helpers/ColorThemeBuilder.ts';

	import Configuration from './Configuration.svelte';
	import Board from './Board.svelte';
	import SelectCategory from './SelectCategory.svelte';
	import WinScreen from './WinScreen.svelte';

	const speech = new SpeechSynthesisUtterance();
	speech.volume = 1;

	let stages = [];
	let voices: SpeechSynthesisVoice[] = [];
	let stage = -1;
	let index = 0;
	let winScreenIsOpen = false;
	let colorTheme;
	let initialLanguage = $configurationStore.language;

	$: speech.voice = voices.find((voice) => voice.lang.match($configurationStore.language));
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
			readOutLoud(`${$i18nStore.texts.pressLetter} ${letter}`);
		}
	}

	function readOutLoudNextWord () {
		speech.onend = () => {
			speech.onend = undefined;
			readOutLoudNextLetter();
		};
		const word = stages[stage].word;

		if (typeof word !== 'undefined') {
			readOutLoud(`${$i18nStore.texts.theWordToWriteIs} ${word}`);
		}
	}

	function readOutLoud (message: string) {
		speech.text = message;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(speech);
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

	window.speechSynthesis.addEventListener('voiceschanged', handleSpeechSynthesisVoices);

	window.readoutloud = readOutLoud;

	function handleSpeechSynthesisVoices () {
		window.speechSynthesis.removeEventListener('voiceschanged', handleSpeechSynthesisVoices);
		voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.match(/e[n|s]/)).sort(function (a, b) {
			const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
			if ( aname < bname ) return -1;
			else if ( aname === bname ) return 0;
			else return +1;
		});
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
		{/if}
		{#if stage !== -1 && !$configurationStore.isConfigurationOpen}
			<input on:input={onInputChanged} on:blur={function () { this.focus() }} autofocus type="text" />
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
	<button on:click={() => readOutLoud($i18nStore.texts.letsStart)} class="btn btn-primary btn-lg btn-block">{$i18nStore.texts.start}</button>
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
	input {
		position: absolute;
		left: -99999px;
		width: 0;
		height: 0;
	}
</style>
