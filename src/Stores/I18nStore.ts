import { CustomStore } from './CustomStore';
import { I18n, InterfaceTexts } from '../InterfaceTexts';
import { localStorage } from '../Helpers/LocalStorage';

class I18nStore extends CustomStore<I18n>
{
	public updateI18n(i18n: I18n): void
	{
		this.update((oldI18n) => i18n);
	}
}

export const i18nStore = new I18nStore(InterfaceTexts.find((it) => ((localStorage.getConfiguration()).language).match(it.language)) as I18n);
