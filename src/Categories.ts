import { LOCALES_EN, LOCALES_ES } from './Domain';

export const Categories: I18nCategories[] = [
	{
		language: LOCALES_ES,
		categories: [
			{
				id: -1,
				name: 'Animales'
			},
			{
				id: -2,
				name: 'Familia'
			},
			{
				id: -3,
				name: 'Chuches'
			}
		],
		stages: [
			{
				categoryId: -1,
				word: 'ardilla',
				image: 'images/words/ardilla.jpg'
			},
			{
				categoryId: -1,
				word: 'caballo',
				image: 'images/words/caballo.jpg'
			},
			{
				categoryId: -1,
				word: 'cebra',
				image: 'images/words/cebra.jpg'
			},
			{
				categoryId: -1,
				word: 'ciervo',
				image: 'images/words/ciervo.jpg'
			},
			{
				categoryId: -1,
				word: 'conejo',
				image: 'images/words/conejo.jpg'
			},
			{
				categoryId: -1,
				word: 'elefante',
				image: 'images/words/elefante.jpg'
			},
			{
				categoryId: -1,
				word: 'gallina',
				image: 'images/words/gallina.jpg'
			},
			{
				categoryId: -1,
				word: 'gato',
				image: 'images/words/gato.jpg'
			},
			{
				categoryId: -1,
				word: 'lemur',
				image: 'images/words/lemur.jpg'
			},
			{
				categoryId: -1,
				word: 'oso',
				image: 'images/words/oso.jpg'
			},
			{
				categoryId: -1,
				word: 'panda',
				image: 'images/words/panda.jpg'
			},
			{
				categoryId: -1,
				word: 'periquito',
				image: 'images/words/periquito.jpg'
			},
			{
				categoryId: -1,
				word: 'perro',
				image: 'images/words/perro.jpg'
			},
			{
				categoryId: -1,
				word: 'tortuga',
				image: 'images/words/tortuga.jpg'
			},
			{
				categoryId: -1,
				word: 'vaca',
				image: 'images/words/vaca.jpg'
			},
			{
				categoryId: -1,
				word: 'yegua',
				image: 'images/words/yegua.jpg'
			},
			{
				categoryId: -2,
				word: 'abuela',
				image: 'images/words/abuela.png',
			},
			{
				categoryId: -2,
				word: 'abuelo',
				image: 'images/words/abuelo.png',
			},
			{
				categoryId: -2,
				word: 'andres',
				image: 'images/words/andres.png',
			},
			{
				categoryId: -2,
				word: 'dani',
				image: 'images/words/dani.png',
			},
			{
				categoryId: -2,
				word: 'mama',
				image: 'images/words/mama.png',
			},
			{
				categoryId: -2,
				word: 'martina',
				image: 'images/words/martina.png',
			},
			{
				categoryId: -2,
				word: 'papa',
				image: 'images/words/papa.png',
			},
			{
				categoryId: -2,
				word: 'sara',
				image: 'images/words/sara.png',
			},
			{
				categoryId: -2,
				word: 'sophie',
				image: 'images/words/sophie.png',
			},
			{
				categoryId: -3,
				word: 'caramelo',
				image: 'images/words/caramelo.png'
			},
			{
				categoryId: -3,
				word: 'chupachups',
				image: 'images/words/chupa-chups.jpg'
			}
		]
	},
	{
		language: LOCALES_EN,
		categories: [
			{
				id: -1,
				name: 'Animals'
			}
		],
		stages: [
			{
				categoryId: -1,
				word: 'squirrel',
				image: 'images/words/ardilla.jpg'
			}
		]
	}
];

export interface Stage {
	categoryId: number,
	word: string,
	image: string,
}

export interface Category {
	id: number,
	name: string
}

export interface I18nCategories {
	language: string,
	categories: Category[],
	stages: Stage[]
}