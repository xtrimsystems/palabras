<script lang="ts">
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { customStagesStore } from './Stores/CustomStagesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
		import { indexedDB } from './IndexDB/IndexedDB.ts'
		import { ImageFileToBase64 } from './Helpers/ImageFileToBase64.ts'

	import CustomStage from './CustomStage.svelte';

	export let category;
	let stages;
	let word;
	let image;
	let files;
	let categoryId;
	let isEditable = false;
	let categoryNameBeforeChange;
	let noStageWordError = false;

	$: stages = $customStagesStore.filter((stg) => stg.categoryId === category.id);
	$: categoryId = category ? category.id : undefined;
	$: (async function imgToBase64() {
		if (files && files[0] && files[0].type.includes('image')) {
			image = await ImageFileToBase64.convert(files[0])
		}
	})();

	async function deleteCategory () {
		const deleted = await indexedDB.removeCategory(categoryId);

		if (deleted) {
			customStagesStore.removeStagesOfCategory(categoryId)
			customCategoriesStore.removeCategory(category);
		}
	}

	async function updateCategory() {
		const updated = await indexedDB.updateCategory(category);

		if (updated) {
			customCategoriesStore.updateCategory(category);
			isEditable = false;
		}
	}

	async function createNewStage () {

		if (typeof word !== 'undefined' && word !== '' && image) {
			try {
				const categoryId = category.id;
				const id = await indexedDB.addStage(word, image, categoryId);

				customStagesStore.addStage({ id, word, image, categoryId});

			} catch (e) {
				console.log(e);
			}

			word = '';
			files = undefined;
			image = undefined;
			noStageWordError = false;
		} else {
			noStageWordError = true;
		}
	}

	function editCategory() {
		categoryNameBeforeChange = category.name;
		isEditable = true
	}

	function cancelEditCategory () {
		category.name = categoryNameBeforeChange;
		isEditable = false;
	}
</script>

<div class="card">
	<h5 id="category-card-{categoryId}" class="card-header card-title" data-toggle="collapse" data-target="#collapse-{categoryId}" aria-controls="collapse-{categoryId}">
        <input
			on:click={(e) => isEditable ? e.stopPropagation() : ''}
			bind:value={category.name}
			autofocus="{isEditable ? 'autofocus': ''}"
			readonly="{isEditable ? '': 'readonly'}"
			class="form-control form-control-lg"
			type="text"
		/>
		<div class="cta">
			{#if isEditable}
				<span class="action" on:click|stopPropagation={deleteCategory}><i class="far fa-trash-alt"></i></span>
				<span class="action" on:click|stopPropagation={cancelEditCategory}><i class="fas fa-times"></i></span>
				<span class="action" on:click|stopPropagation={updateCategory}><i class="fas fa-check"></i></span>
			{:else}
				<span on:click|stopPropagation={editCategory}><i class="far fa-edit"></i></span>
			{/if}
		</div>
	</h5>
	<ul id="collapse-{categoryId}" class="collapse list-group list-group-flush" aria-labelledby="category-card-{categoryId}" data-parent="#categoriesAccordion">
		<li class="list-group-item">
			<label>
				<img src="{image ? image : '/images/upload-image.svg'}" />
				<input bind:files={files} class="visibleButHidden" type="file" accept="image/*" />
			</label>
			<input
				bind:value={word}
				class="form-control form-control-lg"
				type="text"
				placeholder="{$i18nStore.texts.newStage}"
				class:is-invalid={noStageWordError}
			>
			<div class="cta">
				<span on:click={createNewStage}><i class="fas fa-check"></i></span>
			</div>
		</li>
		{#each stages as stage}
			<CustomStage bind:stage={stage} />
		{/each}
	</ul>
</div>

<style>
	[data-toggle="collapse"] {
		cursor: pointer;
	}
	input[readonly] {
		text-align: center;
		cursor: pointer;
	}
	input[type="text"] {
		flex: 1;
	}
	img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-right: 2rem;
		cursor: pointer;
	}
</style>
