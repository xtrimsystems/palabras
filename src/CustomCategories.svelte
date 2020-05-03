<script lang="ts">
	import { configurationStore } from './Stores/ConfigurationStore.ts';
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { indexedDB } from './IndexDB/IndexedDB.ts'
	import { ImageFileToBase64 } from './Helpers/ImageFileToBase64.ts'

	import CustomCategory from './CustomCategory.svelte';

	let name;
	let noCategoryNameError = false;
	let image;
	let files;

	$: (async function imgToBase64() {
		if (files && files[0] && files[0].type.includes('image')) {
			image = await ImageFileToBase64.convert(files[0])
		}
	})();

	async function createNewCategory () {
		if (typeof name !== 'undefined' && name !== '' && image) {
			try {
				const id = await indexedDB.addCategory(name, image);

				customCategoriesStore.addCategory({ id, name, image });

			} catch (e) {
				console.log(e);
			}

			name = '';
			files = undefined;
			image = undefined;
			noCategoryNameError = false;
		} else {
			noCategoryNameError = true
		}
	}
</script>

<div class="card">
	<h5 class="card-header card-title">
		<label>
			<img src="{image ? image : '/images/upload-image.svg'}" class="thumbnail" />
			<input bind:files={files} class="visibleButHidden" type="file" accept="image/*" />
		</label>
		<input
				bind:value={name}
				placeholder="{$i18nStore.texts.newCategory}"
				type="text"
				class="form-control form-control-lg"
				class:is-invalid={noCategoryNameError}
		/>
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
	:global(.thumbnail) {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-right: 1rem;
		cursor: pointer;
	}
	input[type="text"] {
		flex: 1;
	}
</style>
