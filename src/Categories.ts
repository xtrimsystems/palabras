// TODO: Refactor to have each category and related stages in its own file and a builder to retrieve them when needed for given locale
import { I18nCategories, LOCALES_EN, LOCALES_ES } from './Domain';

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
				id: -1,
				categoryId: -1,
				word: 'ardilla',
				image: 'images/words/ardilla.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'caballo',
				image: 'images/words/caballo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'cebra',
				image: 'images/words/cebra.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'ciervo',
				image: 'images/words/ciervo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'conejo',
				image: 'images/words/conejo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'elefante',
				image: 'images/words/elefante.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gallina',
				image: 'images/words/gallina.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gato',
				image: 'images/words/gato.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'lemur',
				image: 'images/words/lemur.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'oso',
				image: 'images/words/oso.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'panda',
				image: 'images/words/panda.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'periquito',
				image: 'images/words/periquito.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'perro',
				image: 'images/words/perro.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'tortuga',
				image: 'images/words/tortuga.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'vaca',
				image: 'images/words/vaca.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'yegua',
				image: 'images/words/yegua.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'abuela',
				image: 'images/words/abuela.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'abuelo',
				image: 'images/words/abuelo.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'andres',
				image: 'images/words/andres.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'dani',
				image: 'images/words/dani.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'mama',
				image: 'images/words/mama.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'martina',
				image: 'images/words/martina.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'papa',
				image: 'images/words/papa.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sara',
				image: 'images/words/sara.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sophie',
				image: 'images/words/sophie.png',
			},
			{
				id: -1,
				categoryId: -3,
				word: 'caramelo',
				image: 'images/words/caramelo.png'
			},
			{
				id: -1,
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
				id: -1,
				categoryId: -1,
				word: 'squirrel',
				image: 'images/words/ardilla.jpg'
			}
		]
	}
];
