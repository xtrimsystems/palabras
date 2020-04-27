import { Category } from '../Categories';
import { CustomEventTarget } from '../Helpers/CustomEventTarget';

class IndexedDB extends CustomEventTarget
{
	private indexedDB: IDBFactory;
	private request: IDBOpenDBRequest;
	private db: IDBDatabase | undefined;
	private DB_NAME = 'palabras';
	private DB_VERSION = 1;
	private DB_STORE_CATEGORIES = 'categories';
	private DB_STORE_WORDS = 'words';

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

			// @ts-ignore
			const wordsStore = evt.currentTarget.result.createObjectStore(
				this.DB_STORE_WORDS,
				{ keyPath: 'id', autoIncrement: true }
			);

			wordsStore.createIndex('categoryId', 'categoryId');
			wordsStore.createIndex('word', 'word');
			wordsStore.createIndex('image', 'image');
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

	public async addCategory(categoryName: string): Promise<number>
	{
		return new Promise<number>((resolve, reject) => {
			const store = this.getObjectStore(this.DB_STORE_CATEGORIES, 'readwrite');
			const request = store.add({ name: categoryName });

			request.onsuccess = () => {
				console.log(request);
				// @ts-ignore
				resolve(request.result);
			}
			request.onerror = (e) => reject(e);
		});
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
