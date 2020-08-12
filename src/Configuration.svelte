<script lang="ts">
	import { ColorThemeType } from './Domain/Configuration.ts';
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { InterfaceTexts } from './InterfaceTexts.ts';

	import Panel from './Panel.svelte';
	import Word from './Word.svelte';

	export let voices: SpeechSynthesisVoice[];

	let lang = $configurationStore.language;
	let colorThemeType = $configurationStore.colorThemeType;
	let isMiniLetterActive = $configurationStore.isMiniLetterActive;
	let shouldShowRewardScreen = $configurationStore.shouldShowRewardScreen;

	$: configurationStore.updateColorTheme(colorThemeType);
	$: configurationStore.updateMiniLetter(isMiniLetterActive);
	$: configurationStore.updateRewardScreen(shouldShowRewardScreen);
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
		<div class="row colors">
			{#each Object.values(ColorThemeType) as colorTheme, i}
				<label class="color {colorTheme} {colorTheme === colorThemeType ? 'active': ''}" title="{colorTheme}">
					<input type=radio bind:group={colorThemeType} value={colorTheme}>
				</label>
			{/each}
		</div>
	</div>

	<div class="form-group">
		<div class="custom-control custom-switch">
			<input bind:checked="{isMiniLetterActive}" type="checkbox" class="custom-control-input" id="miniLetter">
			<label class="custom-control-label" for="miniLetter">{$i18nStore.texts.showLowerCase}</label>
		</div>
	</div>
	<div class="form-group">
		<Word isMiniLetterActive="{isMiniLetterActive}" />
	</div>
	<div class="form-group">
		<div class="custom-control custom-switch">
			<input bind:checked="{shouldShowRewardScreen}" type="checkbox" class="custom-control-input" id="rewardScreen">
			<label class="custom-control-label" for="rewardScreen">{$i18nStore.texts.showRewardScreen}</label>
		</div>
	</div>
</Panel>

<style>
	input[type="radio"] {
		display: none;
	}
	select, option {
		cursor: pointer;
	}
	.colors {
		margin: 0;
	}
	.color {
		margin: 2px;
		position: relative;
		cursor: pointer;
		flex: 1 0 auto;
	}
	@media (max-width: 769px) {
		.color {
			flex: 1 0 21%;
		}
	}
	.color:before {
		content: '';
		float: left;
		padding-top: 100%;
	}
	.color::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.color:hover::after,
	.color.active::after {
		content: '✓';
		background: rgba(0,0,0,0.1);
		color: var(--mainFontColor);
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
