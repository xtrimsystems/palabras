import App from './App.svelte';
import { configurationStore, customCategoriesStore, customStagesStore } from './Stores';
import { localStorage } from './Helpers/LocalStorage';
import { indexedDB } from './IndexDB'

export const app = new App({
	target: document.body,
	props: {}
});

configurationStore.subscribe((configuration) => localStorage.writeConfiguration(configuration));

indexedDB.addEventListener('onOpen', async () => {
	customCategoriesStore.addCategories(await indexedDB.getCategories());
	customStagesStore.addStages(await indexedDB.getStages());
});
