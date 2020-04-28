<script lang="ts">
	import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
	import { indexedDB } from './IndexDB/IndexedDB.ts'

    export let category;

	async function deleteCategory () {
		const deleted = await indexedDB.removeCategory(category.id);

		if (deleted) {
			customCategoriesStore.removeCategory(category);
        }
	}
</script>

<div class="card bg-primary">
	<h5 class="card-header card-title">
        {category.name}
	</h5>
	<ul class="list-group list-group-flush">
		<li class="list-group-item bg-secondary">Cras justo odio</li>
		<li class="list-group-item bg-secondary">Dapibus ac facilisis in</li>
		<li class="list-group-item bg-secondary">Vestibulum at eros</li>
	</ul>
    <button class="btn btn-primary" on:click={() => deleteCategory()}>Delete</button>
</div>

