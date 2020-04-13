import { ColorThemeType, Configuration, Difficulties } from '../Domain';

class LocalStorage
{
	private readonly localStorage: Storage;
	private readonly initialConfiguration: Configuration = {
		difficulty: Difficulties.EASY,
		isOpen: true,
		isMiniLetterActive: false,
		colorThemeType: ColorThemeType.PINK,
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
