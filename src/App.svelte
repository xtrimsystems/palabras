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

	let voices: SpeechSynthesisVoice[] = [];
	let colorTheme;

	speechSynthesis.addEventListener('onLoad', (e, data) => {
		speechSynthesis.setVoice($configurationStore.language);
		voices = data;
	});

	$: speechSynthesis.setVoice($configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);
</script>

<svelte:head>
	<title>{$i18nStore.texts.appName}</title>
</svelte:head>

<main use:CssVars="{colorTheme}" class="container-xl">
{#if voices.length > 0}
	<NavBar />
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
	<button on:click={() => speechSynthesis.readOutLoud($i18nStore.texts.letsStart)} class="btn btn-primary btn-lg btn-block">{$i18nStore.texts.start}</button>
{/if}
</main>

<style>
	main {
		padding: 0;
	}
	:global(.visibleButHidden) {
		position: absolute;
		left: -99999px;
		width: 0;
		height: 0;
	}
	:global(.far,.fas) {
		font-size: 1.5rem;
	}
</style>
