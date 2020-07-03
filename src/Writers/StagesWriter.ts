import { indexedDB } from '../IndexDB'
import { customStagesStore } from '../Stores';
import { Stage } from "../Domain";

export async function createNewStage (word: string, imageBase64: string, categoryId: number): Promise<number>
{
    const id = await indexedDB.addStage(word, imageBase64, categoryId);

    customStagesStore.addStage({ id, word, imageBase64, categoryId});

    return id;
}

export async function deleteStage (stage: Stage): Promise<boolean>
{
    const deleted = await indexedDB.removeStage(stage.id);

    if (deleted) {
        customStagesStore.removeStage(stage);

        return true;
    }

    return false;
}

export async function updateStage(stage: Stage): Promise<boolean>
{
    const updated = await indexedDB.updateStage(stage);

    if (updated) {
        customStagesStore.updateStage(stage);

        return true;
    }

    return false;
}
