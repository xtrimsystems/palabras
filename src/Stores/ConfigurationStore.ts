import { ColorThemeType, Configuration } from '../Domain';
import { CustomStore } from './CustomStore';
import { localStorage } from '../Helpers/LocalStorage';

class ConfigurationStore extends CustomStore<Configuration>
{
	public updateLanguage(language: string) {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			language
		}));
	}

	public updateColorTheme(colorThemeType: ColorThemeType) {
		this.update((configuration: Configuration) => ({
			...configuration,
			colorThemeType
		}));
	}
	public updateMiniLetter(isMiniLetterActive: boolean) {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			isMiniLetterActive
		}));
	}

	public openConfiguration(): void {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			isConfigurationOpen: true
		}));
	}

	public closeConfiguration(): void {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			isConfigurationOpen: false
		}));
	}

	public openCustomCategories(): void {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			isCustomCategoriesOpen: true
		}));
	}

	public closeCustomCategories(): void {
		this.update((configuration: Configuration): Configuration => ({
			...configuration,
			isCustomCategoriesOpen: false
		}));
	}
}

export const configurationStore = new ConfigurationStore(localStorage.getConfiguration());
