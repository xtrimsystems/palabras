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
			},
			{
				id: -4,
				name: 'Cosas de casa',
				imageBase64: 'images/house.jpeg'
			},
			{
				id: -5,
				name: 'Partes del cuerpo',
				imageBase64: 'images/body.png'
			},
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
				imageBase64: 'images/family/abuela.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'abuelo',
				imageBase64: 'images/family/abuelo.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'andres',
				imageBase64: 'images/family/andres.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'dani',
				imageBase64: 'images/family/dani.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'mama',
				imageBase64: 'images/family/mama.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'martina',
				imageBase64: 'images/family/martina.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'papa',
				imageBase64: 'images/family/papa.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sara',
				imageBase64: 'images/family/sara.png',
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sophie',
				imageBase64: 'images/family/sophie.png',
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
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cama',
				imageBase64: 'images/words/bed.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cuento',
				imageBase64: 'images/words/book.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'botella',
				imageBase64: 'images/words/bottle.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'silla',
				imageBase64: 'images/words/chair.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cuco',
				imageBase64: 'images/words/cuco.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'taza',
				imageBase64: 'images/words/cup.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'puerta',
				imageBase64: 'images/words/door.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'biberon',
				imageBase64: 'images/words/feeding-bottle.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'tenedor',
				imageBase64: 'images/words/fork.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'jardin',
				imageBase64: 'images/words/garden.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'vaso',
				imageBase64: 'images/words/glass.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'gafas',
				imageBase64: 'images/words/glasses.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'guantes',
				imageBase64: 'images/words/gloves.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'peine',
				imageBase64: 'images/words/hairbrush.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'mano',
				imageBase64: 'images/words/hand.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'sombrero',
				imageBase64: 'images/words/hat.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cocina',
				imageBase64: 'images/words/kitchen.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cuchillo',
				imageBase64: 'images/words/knife.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'sarten',
				imageBase64: 'images/words/pan.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'lapizero',
				imageBase64: 'images/words/pencil.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'piano',
				imageBase64: 'images/words/piano.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'planta',
				imageBase64: 'images/words/plant.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'plato',
				imageBase64: 'images/words/plate.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cazo',
				imageBase64: 'images/words/saucepan.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'tijeras',
				imageBase64: 'images/words/scissors.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cucharita',
				imageBase64: 'images/words/small-spoon.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'escaleras',
				imageBase64: 'images/words/stairs.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'mesa',
				imageBase64: 'images/words/table.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cepillo',
				imageBase64: 'images/words/toothbrush.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'pasta',
				imageBase64: 'images/words/toothpaste.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cocinita',
				imageBase64: 'images/words/toy-kitchen.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'juguetes',
				imageBase64: 'images/words/toys.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'arbol',
				imageBase64: 'images/words/tree.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'paraguas',
				imageBase64: 'images/words/umbrella.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'ventana',
				imageBase64: 'images/words/window.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'brazo',
				imageBase64: 'images/words/arm.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'oreja',
				imageBase64: 'images/words/ear.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'ojo',
				imageBase64: 'images/words/eye.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'pie',
				imageBase64: 'images/words/foot.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'mano',
				imageBase64: 'images/words/hand.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'piernas',
				imageBase64: 'images/words/legs.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'nariz',
				imageBase64: 'images/words/nose.jpg'
			},
			{
				id: -1,
				categoryId: -5,
				word: 'dientes',
				imageBase64: 'images/words/teeth.jpg'
			},
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
