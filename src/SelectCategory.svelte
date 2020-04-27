<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { Categories } from './Categories.ts';

	import Panel from './Panel.svelte';

	export let stages;
	let category;
	let categories = [];
	let i18nCategories;

	$: i18nCategories = Categories.find((c) => $configurationStore.language.match(c.language));
	$: if (i18nCategories) categories = [...$customCategoriesStore, ...i18nCategories.categories];
	$: if (category) stages = [
			...i18nCategories.stages.filter((stage) => stage.categoryId === category.id),
			...$customCategoriesStore.filter((stage) => stage.categoryId === category.id)
	];
</script>

<Panel>
	<div class="form-group row">
		<label for="category" class="col-md-3 col-form-label">{$i18nStore.texts.category}</label>
		<div class="col-md-9">
			<select bind:value="{category}" name="category" id="category" class="custom-select">
				<option value="">---</option>
                {#each categories as cat}
					<option value="{cat}">{cat.name}</option>
                {/each}
			</select>
		</div>
	</div>
</Panel>
