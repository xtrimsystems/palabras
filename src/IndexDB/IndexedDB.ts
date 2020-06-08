import { Category, Stage } from '../Domain';
import { CustomEventTarget } from '../Helpers/CustomEventTarget';

class IndexedDB extends CustomEventTarget
{
	private indexedDB: IDBFactory;
	private request: IDBOpenDBRequest;
	private db: IDBDatabase | undefined;
	private DB_NAME = 'palabras';
	private DB_VERSION = 1;
	private DB_STORE_CATEGORIES = 'categories';
	private DB_STORE_STAGES = 'stages';

	public constructor()
	{
		super();
		this.indexedDB = window.indexedDB;
		this.request = this.indexedDB.open(this.DB_NAME, this.DB_VERSION);
		this.request.onsuccess = () => {
			this.db = this.request.result;
			this.dispatchEvent(new CustomEvent('onOpen'));
		}
		this.request.onupgradeneeded = (evt) => {
			// @ts-ignore
			const categoriesStore = evt.currentTarget.result.createObjectStore(
				this.DB_STORE_CATEGORIES,
				{ keyPath: 'id', autoIncrement: true }
			);

			categoriesStore.createIndex('name', 'name', { unique: true });
			categoriesStore.createIndex('imageBase64', 'imageBase64');

			// @ts-ignore
			const stagesStore = evt.currentTarget.result.createObjectStore(
				this.DB_STORE_STAGES,
				{ keyPath: 'id', autoIncrement: true }
			);

			stagesStore.createIndex('categoryId', 'categoryId');
			stagesStore.createIndex('name', 'name');
			stagesStore.createIndex('imageBase64', 'imageBase64');
		};
	}

	public async getCategories(): Promise<Category[]>
	{
		return new Promise<Category[]>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_CATEGORIES);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = (e) => reject(e);
		})
	}

	public async addCategory(name: string, imageBase64: string): Promise<number>
	{
		return new Promise<number>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_CATEGORIES, 'readwrite');
			const request = store.add({ name, imageBase64 });
			// @ts-ignore
			request.onsuccess = () => resolve(request.result);
			request.onerror = (e) => reject(e);
		});
	}

	public async removeCategory(id: number): Promise<boolean>
	{
		const deletedStages = await this.removeStagesOfCategory(id);

		if (!deletedStages) return Promise.reject(false);

		return new Promise<boolean>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_CATEGORIES, 'readwrite');
			const request = store.delete(id);

			request.onsuccess = () => resolve(true);
			request.onerror = (e) => reject(false);
		});
	}

	public async updateCategory(category: Category): Promise<Category>
	{
		return new Promise<Category>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_CATEGORIES, 'readwrite');
			const request = store.put(category);
			// @ts-ignore
			request.onsuccess = () => resolve(request.result);
			request.onerror = (e) => reject(e);
		});
	}

	public async getStages(): Promise<Stage[]>
	{
		return new Promise<Stage[]>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_STAGES);
			const request = store.getAll();

			request.onsuccess = () => resolve(request.result);
			request.onerror = (e) => reject(e);
		})
	}

	public async addStage(word: string, imageBase64: string, categoryId: number): Promise<number>
	{
		return new Promise<number>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_STAGES, 'readwrite');
			const request = store.add({ word, imageBase64, categoryId });
			// @ts-ignore
			request.onsuccess = () => resolve(request.result)
			request.onerror = (e) => reject(e);
		});
	}

	public async removeStage(id: number): Promise<boolean>
	{
		return new Promise<boolean>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_STAGES, 'readwrite');
			const request = store.delete(id);

			request.onsuccess = () => resolve(true);
			request.onerror = (e) => reject(false);
		});
	}

	public async updateStage(stage: Stage): Promise<boolean>
	{
		return new Promise<boolean>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_STAGES, 'readwrite');
			const request = store.put(stage);

			request.onsuccess = () => resolve(true);
			request.onerror = (e) => reject(false);
		});
	}

	private async removeStagesOfCategory(categoryId: number): Promise<boolean[]>
	{
		const stages = await this.getStages();

		const deleteStages = stages
			.filter((stage) => stage.categoryId === categoryId)
			.map((stage) => this.removeStage(stage.id));

		return Promise.all(deleteStages);
	}

	private getObjectStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore
	{
		if (!this.db) {
			throw new Error('IndexedDB not initialized');
		}

		return (this.db as IDBDatabase).transaction(storeName, mode).objectStore(storeName);
	}
}

export const indexedDB = new IndexedDB();
