<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { indexedDB } from './IndexDB/IndexedDB.ts'

	import CustomCategory from './CustomCategory.svelte';

	let newCategoryName;

	async function createNewCategory () {
		if (typeof newCategoryName !== 'undefined' && newCategoryName !== '') {
			try {
				const id = await indexedDB.addCategory(newCategoryName);

				customCategoriesStore.addCategory({id, name: newCategoryName});

			} catch (e) {
				console.log(e);
			}

			newCategoryName = '';
		}
	}
</script>

<input bind:value={newCategoryName} type="text" />
<button on:click={createNewCategory} class="btn btn-primary btn-lg btn-block">Create Custom Category</button>
<button class="btn btn-primary btn-lg"  on:click={() => configurationStore.closeCustomCategories()}>x</button>
{#each $customCategoriesStore as category}
    <CustomCategory bind:category="{category}" />
{/each}
