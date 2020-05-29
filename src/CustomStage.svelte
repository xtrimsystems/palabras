<script lang="ts">
	import { customStagesStore } from './Stores/CustomStagesStore.ts';
	import { indexedDB } from './IndexDB/IndexedDB.ts'
	import { ImageFileToBase64 } from './Helpers/ImageFileToBase64.ts'

	export let stage;
	let isEditable = false;
	let stageWordBeforeChange;
	let stageImageBeforeChange;
	let files;
	$: (async function imgToBase64() {
		if (files && files[0] && files[0].type.includes('image')) {
			stage.image = await ImageFileToBase64.convert(files[0])
		}
	})();

    async function deleteStage () {
	    const deleted = await indexedDB.removeStage(stage.id);

	    if (deleted) {
		    customStagesStore.removeStage(stage);
	    }
    }

	async function updateStage() {
		const updated = await indexedDB.updateStage(stage);

		if (updated) {
			customStagesStore.updateStage(stage);
			isEditable = false;
		}
	}

	function editStage() {
		stageWordBeforeChange = stage.word;
		stageImageBeforeChange = stage.image;
		isEditable = true
	}

	function cancelEditStage () {
		stage.word = stageWordBeforeChange;
		stage.image = stageImageBeforeChange;
		isEditable = false;
	}
</script>

<li class="list-group-item">
	{#if isEditable}
		<label>
			<img src="{stage.image}" class="thumbnail" />
			<input bind:files={files} class="visibleButHidden" type="file" accept="image/*" />
		</label>
	{:else}
		<img src="{stage.image}" alt="{stage.word}" class="thumbnail" />
	{/if}
	<input
		bind:value={stage.word}
		readonly="{isEditable ? '': 'readonly'}"
		class="form-control form-control-lg"
		type="text"
		placeholder="{stage.word}"
	>
	<div class="cta">
		{#if isEditable}
			<span on:click={() => deleteStage()}><i class="far fa-trash-alt"></i></span>
			<span class="action" on:click={cancelEditStage}><i class="fas fa-times"></i></span>
			<span class="action" on:click={updateStage}><i class="fas fa-check"></i></span>
		{:else}
			<span on:click={editStage}><i class="far fa-edit"></i></span>
		{/if}
	</div>
</li>
