<script lang="ts">
	import { fly } from 'svelte/transition';

	import {configurationStore} from './Stores/ConfigurationStore.ts';

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
				<span class="nav-link" on:click|preventDefault={openGameView}>Game</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isCustomCategoriesOpen}>
				<span class="nav-link" on:click|preventDefault={openMyCategories}>My Categories</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isConfigurationOpen}>
				<span class="nav-link" on:click|preventDefault={openSettings}>Settings</span>
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
		padding: 10px 20px 0;
		background: var(--white);
	}
	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		background: rgba(0, 0, 0, 0.7);
	}
	@media (min-width: 1200px) {
		.overlay {
			width: 1140px;
		}
	}
	.active {
		color: var(--mainBackgroundColor);
		font-weight: bold;
	}
</style>