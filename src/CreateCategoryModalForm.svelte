<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { i18nStore } from './Stores/I18nStore.ts';
    import { ImageFileToBase64 } from './Helpers/ImageFileToBase64.ts'
    import { createNewCategory } from "./Writers/CategoriesWriter.ts";

    import Modal from './Modal.svelte';

    let newCategoryName;
    let newCategoryImage;
    let noCategoryNameError = false;
    let noCategoryImageError = false;
    let files;

    $: (async function imgToBase64() {
        if (files && files[0] && files[0].type.includes('image')) {
            newCategoryImage = await ImageFileToBase64.convert(files[0])
        }
    })();

    async function saveNewCategory () {
        if (typeof newCategoryName === 'undefined' || newCategoryName === '') {
            noCategoryNameError = true;
            return;
        } else {
            noCategoryNameError = false;
        }

        if (!newCategoryImage) {
            noCategoryImageError = true;
            return;
        } else {
            noCategoryImageError = false;
        }

        await createNewCategory(newCategoryName, newCategoryImage);

        newCategoryName = '';
        files = undefined;
        newCategoryImage = undefined;

    }

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

</script>

<Modal on:close="{close}" >
    <h5 slot="header">{$i18nStore.texts.newCategory}</h5>
    <label>
        {#if newCategoryImage}
            <img src="{newCategoryImage}" class="thumbnail" />
        {:else}
            <span style="position: relative">
                <i class="fas fa-arrow-up"></i>
                <i class="fas fa-camera"></i>
            </span>
            <span class="upload-text">{$i18nStore.texts.uploadPhotoInfo}</span>
        {/if}
        <input bind:files={files} class="visibleButHidden" type="file" accept="image/*" />
    </label>
    <input
            bind:value={newCategoryName}
            placeholder="{$i18nStore.texts.name}"
            type="text"
            class="form-control form-control-lg"
            class:is-invalid={noCategoryNameError}
    />
    <div slot="cta">
        <button type="button" class="btn btn-primary" on:click={saveNewCategory}>{$i18nStore.texts.create}</button>
    </div>
</Modal>

<style>
    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .fa-arrow-up {
        color: var(--darkBackgroundColor);
        font-size: 2rem;
        position: absolute;
    }
    .fa-camera {
        font-size: 5rem;
        color: var(--lightBackgroundColor);
    }
    .upload-text {
        font-size: 1.25rem;
        color: var(--mainBackgroundColor);
        margin-left: 1rem;
        font-family: 'Roboto', sans-serif;
    }
</style>
