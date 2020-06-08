<script lang="ts">
    import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
    import { JsonFile } from './Helpers/JsonFile.ts'
    import { createNewCategory } from "./Writers/CategoriesWriter";

    let jsonFile;

    $: (async function readFile() {
        if (jsonFile && jsonFile[0] && jsonFile[0].type.includes('json')) {
            const categories = JSON.parse(await JsonFile.deserialize(jsonFile[0]));

            categories.forEach(({ name, image }) => createNewCategory(name, image));
        }
    })();

    function exportData() {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify($customCategoriesStore)));
        element.setAttribute('download', 'categories.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
</script>
<button on:click={exportData} class="btn btn-primary">Export</button>
<label class="btn btn-primary">
    Import
    <input bind:files={jsonFile} class="visibleButHidden" type="file" accept="application/json" />
</label>