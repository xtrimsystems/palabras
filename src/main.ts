import App from './App.svelte';
import { configurationStore } from './Stores';
import { localStorage } from './Helpers/LocalStorage';

export const app = new App({
	target: document.body,
	props: {}
});

configurationStore.subscribe((configuration) => localStorage.writeConfiguration(configuration));
