<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { customStagesStore } from './Stores/CustomStagesStore.ts';
	import { Categories } from './Categories.ts';

	export let stages;
	let category;
	let categories = [];
	let i18nCategories;

	$: i18nCategories = Categories.find((c) => $configurationStore.language.match(c.language));
	$: if (i18nCategories) categories = [...$customCategoriesStore, ...i18nCategories.categories];
	$: if (category) stages = [
			...i18nCategories.stages.filter((stage) => stage.categoryId === category.id),
			...$customStagesStore.filter((stage) => stage.categoryId === category.id)
	];
</script>

<div class="row row-cols-1 row-cols-md-2">
	{#each categories as cat}
	<div class="col mb-4">
		<label style="cursor:pointer">
			<div class="card">
				<img src="{cat.image}" class="card-img-top" alt="{cat.name}">
				<div class="card-body">
					<h5 class="card-title">{cat.name}</h5>
				</div>
				<input bind:group={category} type="radio" class="visibleButHidden" value="{cat}">
			</div>
		</label>
	</div>
	{/each}
</div>
