import App from './App.svelte';
import { configurationStore } from './Stores';

export const app = new App({
	target: document.body,
	props: {}
});

configurationStore.subscribe((configuration) => console.log(configuration));
