<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { indexedDB } from './IndexDB/IndexedDB.ts'

	import CustomCategory from './CustomCategory.svelte';

	let name;
	let noCategoryNameError = false;

	async function createNewCategory () {
		if (typeof name !== 'undefined' && name !== '') {
			try {
				const id = await indexedDB.addCategory(name);

				customCategoriesStore.addCategory({ id, name });

			} catch (e) {
				console.log(e);
			}

			name = '';
			noCategoryNameError = false;
		} else {
			noCategoryNameError = true
		}
	}
</script>

<div class="card">
	<h5 class="card-header card-title">
		<div style="width: 100%;">
			<input
					bind:value={name}
					placeholder="{$i18nStore.texts.newCategory}"
					type="text"
					class="form-control form-control-lg"
					class:is-invalid={noCategoryNameError}
			/>
		</div>
		<div class="cta">
			<span on:click={createNewCategory}><i class="fas fa-check"></i></span>
		</div>
	</h5>
</div>
<div class="accordion" id="categoriesAccordion">
{#each $customCategoriesStore as category}
    <CustomCategory bind:category="{category}" />
{/each}
</div>
<button class="btn btn-primary btn-lg"  on:click={() => configurationStore.closeCustomCategories()}>x</button>
<style>
	:global(.card-title) {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
	}
	:global(.list-group-item) {
		display: flex;
		align-items: center;
		position: relative;
	}
	:global(.cta) {
		margin-left: 1.25rem;
		flex: 0 0 auto;
	}
	:global(i) {
		cursor: pointer;
	}
	:global(.action) {
		margin-left: .75rem;
	}
	:global(.action:first-child) {
		margin-left: 0;
	}
	:global(input[readonly]) {
		border: none !important;
		background-color: initial !important;
		outline: none !important;
		box-shadow: none !important;;
	}
</style>
