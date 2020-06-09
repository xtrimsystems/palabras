<script lang="ts">
	import { customStagesStore } from './Stores/CustomStagesStore.ts';
	import { i18nStore } from './Stores/I18nStore.ts';
	import { ImageFileToBase64 } from './Helpers/ImageFileToBase64.ts'
	import { deleteCategory, updateCategory } from "./Writers/CategoriesWriter.ts";
	import { createNewStage } from "./Writers/StagesWriter.ts";

	import CustomStage from './CustomStage.svelte';

	export let category;
	let stages;
	let newStageWord;
	let newStageImage;
	let newStageFormFiles;
	let editCategoryFormFiles;
	let isEditable = false;
	let categoryNameBeforeChange;
	let categoryImageBeforeChange;
	let noStageWordError = false;

	$: stages = $customStagesStore.filter((stg) => stg.categoryId === category.id);
	$: (async function imgToBase64() {
		if (newStageFormFiles && newStageFormFiles[0] && newStageFormFiles[0].type.includes('image')) {
			newStageImage = await ImageFileToBase64.convert(newStageFormFiles[0])
		}
	})();
	$: (async function imgToBase64() {
		if (editCategoryFormFiles && editCategoryFormFiles[0] && editCategoryFormFiles[0].type.includes('image')) {
			category.imageBase64 = await ImageFileToBase64.convert(editCategoryFormFiles[0])
		}
	})();

	async function onClickDeleteCategory () {
		await deleteCategory(category);
	}

	async function onClickUpdateCategory() {
		if (await updateCategory(category)) {
			isEditable = false;
		}
	}

	async function saveNewStage () {
		if (typeof newStageWord !== 'undefined' && newStageWord !== '' && newStageImage) {

			if (await createNewStage(newStageWord, newStageImage, category.id)) {
				newStageWord = '';
				newStageFormFiles = undefined;
				newStageImage = undefined;
				noStageWordError = false;
			} else {
				// TODO: Show there was an error
			}
		} else {
			noStageWordError = true;
		}
	}

	function editCategory() {
		categoryNameBeforeChange = category.name;
		categoryImageBeforeChange = category.imageBase64;
		isEditable = true
	}

	function cancelEditCategory () {
		category.name = categoryNameBeforeChange;
		category.imageBase64 = categoryImageBeforeChange;
		isEditable = false;
	}
</script>

<div class="card">
	<h5 id="category-card-{category.id}" class="card-header card-title" data-toggle="collapse" data-target="#collapse-{category.id}" aria-controls="collapse-{category.id}">
		{#if isEditable}
			<label on:click|stopPropagation>
				<img src="{category.imageBase64}" class="thumbnail" />
				<input bind:files={editCategoryFormFiles} class="visibleButHidden" type="file" accept="image/*" />
			</label>
		{:else}
			<img src="{category.imageBase64}" alt="{category.name}" class="thumbnail" />
		{/if}
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
				<span class="action" on:click|stopPropagation={onClickDeleteCategory}><i class="far fa-trash-alt"></i></span>
				<span class="action" on:click|stopPropagation={cancelEditCategory}><i class="fas fa-times"></i></span>
				<span class="action" on:click|stopPropagation={onClickUpdateCategory}><i class="fas fa-check"></i></span>
			{:else}
				<span on:click|stopPropagation={editCategory}><i class="far fa-edit"></i></span>
			{/if}
		</div>
	</h5>
	<ul id="collapse-{category.id}" class="collapse list-group list-group-flush" aria-labelledby="category-card-{category.id}" data-parent="#categoriesAccordion">
		<li class="list-group-item">
			<label>
				<img src="{newStageImage ? newStageImage : '/images/upload-image.svg'}" class="thumbnail" />
				<input bind:files={newStageFormFiles} class="visibleButHidden" type="file" accept="image/*" />
			</label>
			<input
				bind:value={newStageWord}
				class="form-control form-control-lg"
				type="text"
				placeholder="{$i18nStore.texts.newStage}"
				class:is-invalid={noStageWordError}
			>
			<div class="cta">
				<span on:click={saveNewStage}><i class="fas fa-check"></i></span>
			</div>
		</li>
		{#each stages as stage}
			<CustomStage bind:stage={stage} />
		{/each}
	</ul>
</div>

<style>
	:global(.list-group-item) {
		display: flex;
		align-items: center;
		position: relative;
	}
	[data-toggle="collapse"] {
		cursor: pointer;
	}
	input[readonly] {
		cursor: pointer;
	}
	input[type="text"] {
		flex: 1;
	}
</style>
