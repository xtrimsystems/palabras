import { ColorThemeType, Configuration, Difficulties } from '../Domain';
import { CustomStore } from './CustomStore';
import { localStorage } from '../Helpers/LocalStorage';

class ConfigurationStore extends CustomStore<Configuration>
{
	public updateLanguage(language: string) {
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
	public updateMiniLetter(isMiniLetterActive: boolean) {
		this.update((configuration: Configuration) => ({
			...configuration,
			isMiniLetterActive
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

export const configurationStore = new ConfigurationStore(localStorage.getConfiguration());
