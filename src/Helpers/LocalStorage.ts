import { ColorThemeType, Configuration, SUPPORTED_LOCALES } from '../Domain';

const defaultLanguage = window.navigator.language;
let initialLanguage = defaultLanguage === 'es' ? 'es-ES' : defaultLanguage === 'en' ? 'en-GB': defaultLanguage;
initialLanguage = SUPPORTED_LOCALES.find((locale) => initialLanguage.match(locale)) ? initialLanguage : 'en-GB';

class LocalStorage
{
	private readonly localStorage: Storage;
	private readonly initialConfiguration: Configuration = {
		isConfigurationOpen: true,
		isCustomCategoriesOpen: false,
		isMiniLetterActive: false,
		colorThemeType: ColorThemeType.PINK,
		language: initialLanguage
	};

	public constructor(localStorage: Storage)
	{
		this.localStorage = localStorage;
		if (!this.hasConfiguration()) {
			this.writeConfiguration(this.initialConfiguration);
		}
	}

	public writeConfiguration(configuration: Configuration)
	{
		this.localStorage.setItem('configuration', JSON.stringify(configuration))
	}

	public getConfiguration(): Configuration
	{
		return JSON.parse(this.localStorage.getItem('configuration') as string);
	}

	private hasConfiguration(): boolean
	{
		return this.localStorage.getItem('configuration') !== null;
	}
}

export const localStorage = new LocalStorage(window.localStorage);
