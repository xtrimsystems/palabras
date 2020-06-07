<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { CssVars } from './Helpers/CssVars.ts';
	import { ColorThemeBuilder } from './Helpers/ColorThemeBuilder.ts';
	import { speechSynthesis } from './Helpers/SpeechSynthesis.ts'

	import Configuration from './Configuration.svelte';
	import Board from './Board.svelte';
	import CustomCategories from './CustomCategories.svelte';
	import NavBar from './NavBar.svelte';

	let voices: SpeechSynthesisVoice[];
	let colorTheme;
	let isSidebarOpen = false;

	speechSynthesis.addEventListener('onLoad', (e, data) => {
		speechSynthesis.setVoice($configurationStore.language);
		voices = data;
	});

	function startGame () {
		speechSynthesis.readOutLoud($i18nStore.texts.letsStart);
		voices = [];
	}

	$: speechSynthesis.setVoice($configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);
</script>

<svelte:head>
	<title>{$i18nStore.texts.appName}</title>
</svelte:head>

<main use:CssVars="{colorTheme}" class="container-xl" class:isSidebarOpen>
{#if voices}
	{#if voices.length > 0}
		<NavBar bind:isSidebarOpen={isSidebarOpen} />
		{#if !$configurationStore.isCustomCategoriesOpen}
		<div class:visibleButHidden="{$configurationStore.isConfigurationOpen}">
			<Board />
		</div>
		{/if}
		{#if $configurationStore.isConfigurationOpen}
			<Configuration voices="{voices}" />
		{/if}
		{#if $configurationStore.isCustomCategoriesOpen}
			<CustomCategories />
		{/if}
	{:else}
		<div>Install speech synthesis voices</div>
	{/if}
{:else}
	<button on:click={startGame} class="btn btn-primary btn-lg btn-block">{$i18nStore.texts.start}</button>
{/if}
</main>

<style>
	main {
		padding: 0;
	}
	main.isSidebarOpen {
		overflow: hidden;
		height: 100vh;
	}
	:global(.visibleButHidden) {
		position: absolute;
		left: -99999px;
	}
	:global(.far,.fas) {
		font-size: 1.5rem;
	}
</style>
