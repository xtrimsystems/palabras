import { ColorThemeType, Configuration, Difficulties } from '../Domain';
import { CustomStore } from './CustomStore';
import { Language } from '../Domain/Language';

class ConfigurationStore extends CustomStore<Configuration>
{
	public updateLanguage(language: Language) {
		this.update((configuration: Configuration) => ({
			...configuration,
			language
		}));
	}

	public updateDifficulty(difficulty: Difficulties) {
		this.update((configuration: Configuration) => ({
			...configuration,
			difficulty
		}));
	}

	public updateColorTheme(colorThemeType: ColorThemeType) {
		this.update((configuration: Configuration) => ({
			...configuration,
			colorThemeType
		}));
	}

	public openConfiguration(): void {
		this.update((configuration: Configuration) => ({
			...configuration,
			isOpen: true
		}));
	}

	public closeConfiguration(): void {
		this.update((configuration: Configuration) => ({
			...configuration,
			isOpen: false
		}));
	}
}

export const configurationStore = new ConfigurationStore({
	volume: 1,
	difficulty: Difficulties.EASY,
	isOpen: true,
	colorThemeType: ColorThemeType.PINK,
});
