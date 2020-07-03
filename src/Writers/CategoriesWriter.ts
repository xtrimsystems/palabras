import { customCategoriesStore, customStagesStore } from '../Stores';
import { indexedDB } from '../IndexDB'
import {Category} from "../Domain";

export async function createNewCategory (name: string, imageBase64: string): Promise<number>
{
    const id = await indexedDB.addCategory(name, imageBase64);

    customCategoriesStore.addCategory({ id, name, imageBase64 });

    return id;
}

export async function deleteCategory (category: Category): Promise<boolean>
{
    const deleted = await indexedDB.removeCategory(category.id);

    if (deleted) {
        customStagesStore.removeStagesOfCategory(category.id)
        customCategoriesStore.removeCategory(category);

        return true;
    }

    return false;
}

export async function updateCategory(category: Category): Promise<boolean>
{
    const updated = await indexedDB.updateCategory(category);

    if (updated) {
        customCategoriesStore.updateCategory(category);

        return true;
    }

    return false;
}
