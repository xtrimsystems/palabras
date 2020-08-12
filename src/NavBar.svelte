<script lang="ts">
	import { fly } from 'svelte/transition';

	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';

	export let isSidebarOpen = false;

	function openGameView() {
		configurationStore.closeConfigurationAndCustomCategories();
		toggleSideBarState();
	}

	function openMyCategories() {
		configurationStore.openCustomCategories();
		toggleSideBarState();
	}

	function openSettings() {
		configurationStore.openConfiguration();
		toggleSideBarState();
	}

	function toggleSideBarState() {
		isSidebarOpen = !isSidebarOpen;
	}

</script>
<nav class="navbar navbar-dark bg-primary">
	<button on:click|preventDefault={toggleSideBarState} class="navbar-toggler">
		<span class="navbar-toggler-icon"></span>
	</button>
	<slot></slot>
</nav>
{#if isSidebarOpen}
<div class="sidebar">
	<div class="navbarNav" transition:fly="{{ x: -50, duration: 250 }}">
		<ul class="navbar-nav">
			<li class="nav-item" class:active={!$configurationStore.isConfigurationOpen && !$configurationStore.isCustomCategoriesOpen}>
				<span class="nav-link" on:click|preventDefault={openGameView}>{$i18nStore.texts.game}</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isCustomCategoriesOpen}>
				<span class="nav-link" on:click|preventDefault={openMyCategories}>{$i18nStore.texts.myCategories}</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isConfigurationOpen}>
				<span class="nav-link" on:click|preventDefault={openSettings}>{$i18nStore.texts.settings}</span>
			</li>
		</ul>
	</div>
	<div on:click={toggleSideBarState} class="overlay"></div>
</div>
{/if}

<style>
	.sidebar {
		position: relative;
	}
	.navbarNav {
		position: fixed;
		height: 100vh;
		z-index: 2;
		padding-top: 10px;
		background: var(--white);
		box-shadow: 14px -6px 11px -12px rgba(0, 0, 0, 0.7)
	}
	.nav-item {
		position: relative;
		padding: 2px 20px;
		cursor: pointer;
		transition: background-color 0.5s ease;
	}
	.nav-item.active {
		background-color: var(--lightBackgroundColor) !important;
	}
	.nav-item:hover {
		background-color: var(--lightgrey);
	}
	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		background-color: rgba(0,0,0,0.3);
	}
	@media (min-width: 1200px) {
		.overlay {
			width: 1140px;
		}
	}
</style>