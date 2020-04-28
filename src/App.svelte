<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { CssVars } from './Helpers/CssVars.ts';
	import { ColorThemeBuilder } from './Helpers/ColorThemeBuilder.ts';
	import { speechSynthesis } from './Helpers/SpeechSynthesis.ts'

	import Configuration from './Configuration.svelte';
	import Board from './Board.svelte';
	import CustomCategories from './CustomCategories.svelte';

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
	<div class:visibleButHidden="{$configurationStore.isConfigurationOpen || $configurationStore.isCustomCategoriesOpen}">
		<Board />
		<button class="btn btn-primary btn-lg"  on:click={() => configurationStore.openConfiguration()}>⚙</button>
<!--		<button class="btn btn-primary btn-lg"  on:click={() => configurationStore.openCustomCategories()}>⚙</button>-->
	</div>
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
		padding: 1em;
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
	}
	.visibleButHidden {
		position: absolute;
		left: -99999px;
		width: 0;
		height: 0;
	}
</style>
