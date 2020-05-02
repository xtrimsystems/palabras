<script lang="ts">
	import {configurationStore} from './Stores/ConfigurationStore.ts';
</script>
<nav class="navbar navbar-dark bg-primary">
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item" class:active={!$configurationStore.isConfigurationOpen && !$configurationStore.isCustomCategoriesOpen}>
				<span class="nav-link" on:click|preventDefault={() => configurationStore.closeConfigurationAndCustomCategories()} data-toggle="collapse" data-target=".navbar-collapse.show">Game</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isCustomCategoriesOpen}>
				<span class="nav-link" on:click|preventDefault={() => configurationStore.openCustomCategories()} data-toggle="collapse" data-target=".navbar-collapse.show">My Categories</span>
			</li>
			<li class="nav-item" class:active={$configurationStore.isConfigurationOpen}>
				<span class="nav-link" on:click|preventDefault={() => configurationStore.openConfiguration()} data-toggle="collapse" data-target=".navbar-collapse.show">Settings</span>
			</li>
		</ul>
	</div>
</nav>
