<script lang="ts">
    import { customCategoriesStore } from './Stores/CustomCategoriesStore.ts';
    import { customStagesStore } from './Stores/CustomStagesStore.ts';
    import { JsonFile } from './Helpers/JsonFile.ts'
    import { createNewCategory } from './Writers/CategoriesWriter.ts';
    import { createNewStage } from "./Writers/StagesWriter.ts";

    export let showCreateNewCategoryModalForm;
    let jsonFile;

    $: (async function readFile() {
        if (jsonFile && jsonFile[0] && jsonFile[0].type.includes('json')) {

            try {
                const fileDeserialize = await JsonFile.deserialize(jsonFile[0]);
                const { categories, stages } = JSON.parse(fileDeserialize);
                const createCategoriesTasks = categories.map(async ({ id, name, imageBase64 }) => ({ id, newId: await createNewCategory(name, imageBase64)}));
                const resultCategories = await Promise.all([...createCategoriesTasks]);
                const createStagesTasks = [];

                resultCategories.forEach(({ id, newId }) =>
                        stages.forEach(({ categoryId, word, imageBase64 }) =>
                                id === categoryId ? createStagesTasks.push(createNewStage(word, imageBase64, newId)): false));

                await Promise.all(createStagesTasks);

            } catch (e) {
                // TODO Show error, probably duplicated category name/stage word
                console.log(e);
            }
        }
    })();

    function exportData() {
        const element = document.createElement('a');

        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
            categories: $customCategoriesStore,
            stages: $customStagesStore,
        })));

        element.setAttribute('download', 'backup.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
</script>

<div class="dropleft">
    <i class="fas fa-ellipsis-v" id="customCategoriesMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
    <div class="dropdown-menu" aria-labelledby="customCategoriesMenuButton">
        <div class="dropdown-item" on:click={() => showCreateNewCategoryModalForm = true}>New</div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" on:click={exportData}>Export</div>
        <div class="dropdown-divider"></div>
        <label class="dropdown-item">
            Import
            <input bind:files={jsonFile} class="visibleButHidden" type="file" accept="application/json" />
        </label>
    </div>
</div>

<style>
    .dropdown-menu {
        box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0,0,0,.12);
    }
    #customCategoriesMenuButton {
        color: var(--lightBackgroundColor);
        padding: 0 0.5rem;
    }
</style>