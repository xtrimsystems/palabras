<script lang="ts">
	import { Categories } from './Categories.ts';

	import Panel from './Panel.svelte';

	export let stages;
	let category;

	$: if (category) stages = category.stages;
</script>

<Panel>
	<div class="form-group row">
		<label for="category" class="col-md-3 col-form-label">Categoría</label>
		<div class="col-md-9">
			<select bind:value="{category}" name="category" id="category" class="custom-select">
				<option value="">---</option>
                {#each Categories as cat}
					<option value="{cat}">{cat.name}</option>
                {/each}
			</select>
		</div>
	</div>
</Panel>
