<script lang="ts">
	import { ColorThemeType } from './Domain/Configuration.ts';
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { InterfaceTexts } from './InterfaceTexts.ts';

	import Panel from './Panel.svelte';
	import Board from './Board.svelte';

	export let voices: SpeechSynthesisVoice[];

	let lang = $configurationStore.language;
	let colorThemeType = $configurationStore.colorThemeType;
	let isMiniLetterActive = $configurationStore.isMiniLetterActive;

	$: configurationStore.updateColorTheme(colorThemeType);
	$: configurationStore.updateMiniLetter(isMiniLetterActive);
	$: if (lang !== undefined) configurationStore.updateLanguage(lang);
	$: i18nStore.updateI18n(InterfaceTexts.find((it) => $configurationStore.language.match(it.language)))
</script>

<Panel>
	<div class="form-group row">
		<label for="voices" class="col-md-3 col-form-label">{$i18nStore.texts.language}</label>
		<div class="col-md-9">
			<select bind:value="{lang}" name="voices" id="voices" class="custom-select">
				{#each voices as voice}
					<option value="{voice.lang}">{voice.name}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="form-group">
		<div class="row">
			<label class="col-md-3 col-form-label">{$i18nStore.texts.color}</label>
		</div>
		{#each Object.values(ColorThemeType) as colorTheme}
			<label class="color {colorTheme} {colorTheme === colorThemeType ? 'active': ''}" title="{colorTheme}">
				<input type=radio bind:group={colorThemeType} value={colorTheme}>
			</label>
		{/each}
	</div>

	<div class="form-group">
		<Board
				stage="{{word: 'Demo'}}"
				index="{0}"
				isDemo="{true}"
		/>
		<div class="custom-control custom-checkbox">
			<input bind:checked="{isMiniLetterActive}" type="checkbox" class="custom-control-input" id="miniLetter">
			<label class="custom-control-label" for="miniLetter">{$i18nStore.texts.showLowerCase}</label>
		</div>
	</div>

	<div class="form-group">
		<button class="btn btn-primary btn-lg btn-block" on:click={() => configurationStore.closeConfiguration()}>{$i18nStore.texts.save}</button>
	</div>
</Panel>

<style>
	input[type="radio"] {
		display: none;
	}
	select, option {
		cursor: pointer;
	}
	.color {
		width: calc(25% - 4px);
		height: 90px;
		margin: 2px;
		position: relative;
		cursor: pointer;
	}
	.color:hover::after,
	.color.active::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.1);
		color: var(--mainFontColor);
	}
	.color.active::after {
		content: '✓';
	}
	.Pink {
		background-color: #ec407a;
	}
	.Purple {
		background-color: #ab47bc;
	}
	.Blue {
		background-color: #42a5f5;
	}
	.Green {
		background-color: #66bb6a;
	}
	.Yellow {
		background-color: #ffca28;
	}
	.Orange {
		background-color: #ff7043;
	}
	.Red {
		background-color: #f44336;
	}
	.Brown {
		background-color: #8d6e63;
	}
</style>
