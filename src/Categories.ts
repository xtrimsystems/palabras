// TODO: Refactor to have each category and related stages in its own file and a builder to retrieve them when needed for given locale
import { I18nCategories, LOCALES_EN, LOCALES_ES } from './Domain';

export const Categories: I18nCategories[] = [
	{
		language: LOCALES_ES,
		categories: [
			{
				id: -1,
				name: 'Animales',
				imageBase64: 'images/animals.webp'
			},
			{
				id: -2,
				name: 'Familia',
				imageBase64: 'images/family.png'
			},
			{
				id: -3,
				name: 'Chuches',
				imageBase64: 'images/candy.jpg'
			}
		],
		stages: [
			{
				id: -1,
				categoryId: -1,
				word: 'ardilla',
				imageBase64: 'images/words/ardilla.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'caballo',
				imageBase64: 'images/words/caballo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'cebra',
				imageBase64: 'images/words/cebra.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'ciervo',
				imageBase64: 'images/words/ciervo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'conejo',
				imageBase64: 'images/words/conejo.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'elefante',
				imageBase64: 'images/words/elefante.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gallina',
				imageBase64: 'images/words/gallina.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gato',
				imageBase64: 'images/words/gato.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'lemur',
				imageBase64: 'images/words/lemur.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'oso',
				imageBase64: 'images/words/oso.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'panda',
				imageBase64: 'images/words/panda.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'periquito',
				imageBase64: 'images/words/periquito.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'perro',
				imageBase64: 'images/words/perro.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'tortuga',
				imageBase64: 'images/words/tortuga.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'vaca',
				imageBase64: 'images/words/vaca.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'yegua',
				imageBase64: 'images/words/yegua.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'abuela',
				imageBase64: 'images/words/abuela.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'abuelo',
				imageBase64: 'images/words/abuelo.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'andres',
				imageBase64: 'images/words/andres.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'dani',
				imageBase64: 'images/words/dani.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'mama',
				imageBase64: 'images/words/mama.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'martina',
				imageBase64: 'images/words/martina.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'papa',
				imageBase64: 'images/words/papa.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sara',
				imageBase64: 'images/words/sara.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sophie',
				imageBase64: 'images/words/sophie.png',
			},
			{
				id: -1,
				categoryId: -3,
				word: 'caramelo',
				imageBase64: 'images/words/caramelo.png'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'chupachups',
				imageBase64: 'images/words/chupa-chups.jpg'
			}
		]
	},
	{
		language: LOCALES_EN,
		categories: [
			{
				id: -1,
				name: 'Animals',
				imageBase64: 'images/animals.webp'
			}
		],
		stages: [
			{
				id: -1,
				categoryId: -1,
				word: 'squirrel',
				imageBase64: 'images/words/ardilla.jpg'
			}
		]
	}
];
