<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
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

	$: speech.voice = voices.find((voice) => voice.lang === $configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);
	$: if (stages.length > 0) startGame();

	async function handleKeydown (event: KeyboardEvent) {
		if (stage === -1) return;

		const word = stages[stage].word;

		if (event.key !== word[index]) return;

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
			readOutLoud(`Teclea la letra ${letter}`);
		}
	}

	function readOutLoudNextWord () {
		speech.onend = () => {
			speech.onend = undefined;
			readOutLoudNextLetter();
		};
		const word = stages[stage].word;

		if (typeof word !== 'undefined') {
			readOutLoud(`La palabra a escribir es ${word}`);
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

<main use:CssVars="{colorTheme}">
{#if voices.length > 0}
	{#if winScreenIsOpen}
		<WinScreen />
	{:else}
		{#if stages.length === 0 && !$configurationStore.isOpen}
			<SelectCategory bind:stages="{stages}" />
		{/if}
		{#if stage !== -1 && !$configurationStore.isOpen}
			<Board
					stage="{stages[stage]}"
					index="{index}"
					difficulty="{$configurationStore.difficulty}"
			/>
			<button class="btn btn-primary btn-lg" on:click="{readOutLoudNextLetter}">Repetir letra</button>
		{/if}
		{#if $configurationStore.isOpen}
			<Configuration voices="{voices}" />
		{:else}
			<button class="btn btn-primary btn-lg" on:click={() => configurationStore.openConfiguration()}>⚙</button>
		{/if}
	{/if}
{/if}
</main>

<svelte:window on:keyup={handleKeydown}/>

<style>
	main {
		padding: 1em;
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
	}
</style>
