<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { CssVars } from './Helpers/CssVars.ts';
	import { ColorThemeBuilder } from './Helpers/ColorThemeBuilder.ts';

	import Configuration from './Configuration.svelte';
	import Board from './Board.svelte';
	import WinScreen from './WinScreen.svelte';

	const speech = new SpeechSynthesisUtterance();
	speech.volume = 1;

	const stageAnimals = [
		{
			word: 'ardilla',
			image: 'images/words/ardilla.jpg'
		},
		{
			word: 'caballo',
			image: 'images/words/caballo.jpg'
		},
		{
			word: 'cebra',
			image: 'images/words/cebra.jpg'
		},
		{
			word: 'ciervo',
			image: 'images/words/ciervo.jpg'
		},
		{
			word: 'conejo',
			image: 'images/words/conejo.jpg'
		},
		{
			word: 'elefante',
			image: 'images/words/elefante.jpg'
		},
		{
			word: 'gallina',
			image: 'images/words/gallina.jpg'
		},
		{
			word: 'gato',
			image: 'images/words/gato.jpg'
		},
		{
			word: 'lemur',
			image: 'images/words/lemur.jpg'
		},
		{
			word: 'oso',
			image: 'images/words/oso.jpg'
		},
		{
			word: 'panda',
			image: 'images/words/panda.jpg'
		},
		{
			word: 'periquito',
			image: 'images/words/periquito.jpg'
		},
		{
			word: 'perro',
			image: 'images/words/perro.jpg'
		},
		{
			word: 'tortuga',
			image: 'images/words/tortuga.jpg'
		},
		{
			word: 'vaca',
			image: 'images/words/vaca.jpg'
		},
		{
			word: 'yegua',
			image: 'images/words/yegua.jpg'
		}
	];
	const stagesFamily = [
		{
			word: 'abuela',
			image: 'images/words/abuela.png',
		},
		{
			word: 'abuelo',
			image: 'images/words/abuelo.png',
		},
		{
			word: 'andres',
			image: 'images/words/andres.png',
		},
		{
			word: 'dani',
			image: 'images/words/dani.png',
		},
		{
			word: 'mama',
			image: 'images/words/mama.png',
		},
		{
			word: 'martina',
			image: 'images/words/martina.png',
		},
		{
			word: 'papa',
			image: 'images/words/papa.png',
		},
		{
			word: 'sara',
			image: 'images/words/sara.png',
		},
		{
			word: 'sophie',
			image: 'images/words/sophie.png',
		},
	];

	const stages = [
		{
			word: 'caramelo',
			image: 'images/words/caramelo.png'
		},
		{
			word: 'chupachups',
			image: 'images/words/chupa-chups.jpg'
		},
			...stageAnimals,
			...stagesFamily,
	];
	let voices: SpeechSynthesisVoice[] = [];
	let stage = -1;
	let index = 0;
	let winScreenIsOpen = false;
	let colorTheme;

	$: speech.voice = voices.find((voice) => voice.lang === $configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);

	async function handleKeydown (event: KeyboardEvent) {
		if (stage === -1) return;

		const word = stages[stage].word;
		let isValid = false;

		if (event.key === word[index]) {
			isValid = true;
			index++;
		}

		if (index === word.length) {
			await showWinScreen(5000);
			index = 0;
			stage++;

			if (stage < stages.length) {
				readOutLoudNextWord();

				return;
			} else if (stage === stages.length) {
				index = 0;
				stage = -1;

				return;
			}
		}

		if (isValid) {
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
		{#if stage === -1 && !$configurationStore.isOpen}
			<div class="startGamePanel" on:click={startGame}>Click para comenzar!</div>
		{/if}
		{#if stage !== -1 && !$configurationStore.isOpen}
			<Board
					stage="{stages[stage]}"
					index="{index}"
					difficulty="{$configurationStore.difficulty}"
			/>
			<button on:click="{readOutLoudNextLetter}">Repetir letra</button>
		{/if}
		{#if $configurationStore.isOpen}
			<Configuration voices="{voices}" />
		{:else}
			<button on:click={() => configurationStore.openConfiguration()}>⚙</button>
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
	.startGamePanel {
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--mainBackgroundColor);
		color: var(--mainFontColor);
		cursor: pointer;
		font-size: 45px;
	}
</style>
