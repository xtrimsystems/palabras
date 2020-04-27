import { CustomStore } from './CustomStore';
import { Category } from '../Categories';

class CustomCategoriesStore extends CustomStore<Category[]>
{
	public addCategories(categories: Category[]) {
		this.set(categories);
	}

	public addCategory(category: Category) {
		this.update((categories: Category[]): Category[] =>
			categories.find((cat) => cat.id === category.id)
				? [...categories]
				: [...categories, category]
		);
	}

	public removeCategory(category: Category) {
		this.update((categories: Category[]): Category[] =>
			categories.filter((cat) => cat.id !== category.id)
		);
	}

	public updateCategory(category: Category) {
		this.update((categories: Category[]): Category[] =>
			categories.map((cat) => cat.id === category.id
				? category
				: cat
			)
		);
	}
}

export const customCategoriesStore = new CustomCategoriesStore([]);
