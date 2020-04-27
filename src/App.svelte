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

	let voices: SpeechSynthesisVoice[] = [];
	let colorTheme;
	let newCategoryName;

	speechSynthesis.addEventListener('onLoad', (e, data) => {
		speechSynthesis.setVoice($configurationStore.language);
		voices = data;
	});

	$: speechSynthesis.setVoice($configurationStore.language);
	$: colorTheme = ColorThemeBuilder.build($configurationStore.colorThemeType);

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
	<!--{#if stages.length === 0 && !$configurationStore.isConfigurationOpen}
		<input bind:value={newCategoryName} type="text" />
		<button on:click={createNewCategory} class="btn btn-primary btn-lg btn-block">Create Custom Category</button>
	{/if}-->
	<div class:visibleButHidden="{$configurationStore.isConfigurationOpen}">
		<Board />
		<button
				class:visibleButHidden="{$configurationStore.isConfigurationOpen}"
				class="btn btn-primary btn-lg"
				on:click={() => configurationStore.openConfiguration()}
		>⚙</button>
	</div>
	<div class:visibleButHidden="{!$configurationStore.isConfigurationOpen}">
		<Configuration voices="{voices}" />
	</div>
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
