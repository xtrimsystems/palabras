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
				name: 'Cosas de casa',
				imageBase64: 'images/house.jpeg'
			},
			{
				id: -3,
				name: 'Partes del cuerpo',
				imageBase64: 'images/body.png'
			},
			{
				id: -4,
				name: 'Comida',
				imageBase64: 'images/food.png'
			},
		],
		stages: [
			{
				id: -1,
				categoryId: -1,
				word: 'ardilla',
				imageBase64: 'images/words/squirrel.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'caballo',
				imageBase64: 'images/words/horse-male.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'cebra',
				imageBase64: 'images/words/zebra.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'ciervo',
				imageBase64: 'images/words/deer.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'conejo',
				imageBase64: 'images/words/rabbit.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'elefante',
				imageBase64: 'images/words/elephant.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gallina',
				imageBase64: 'images/words/chicken.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'gato',
				imageBase64: 'images/words/cat.jpg'
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
				imageBase64: 'images/words/bear.jpg'
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
				imageBase64: 'images/words/parakeet.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'perro',
				imageBase64: 'images/words/dog.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'tortuga',
				imageBase64: 'images/words/turtle.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'vaca',
				imageBase64: 'images/words/cow.jpg'
			},
			{
				id: -1,
				categoryId: -1,
				word: 'yegua',
				imageBase64: 'images/words/horse-female.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cama',
				imageBase64: 'images/words/bed.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cuento',
				imageBase64: 'images/words/book.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'botella',
				imageBase64: 'images/words/bottle.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'silla',
				imageBase64: 'images/words/chair.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cuco',
				imageBase64: 'images/words/cuckoo.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'taza',
				imageBase64: 'images/words/cup.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'puerta',
				imageBase64: 'images/words/door.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'biberon',
				imageBase64: 'images/words/feeding-bottle.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'tenedor',
				imageBase64: 'images/words/fork.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'jardin',
				imageBase64: 'images/words/garden.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'vaso',
				imageBase64: 'images/words/glass.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'gafas',
				imageBase64: 'images/words/glasses.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'guantes',
				imageBase64: 'images/words/gloves.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'peine',
				imageBase64: 'images/words/hairbrush.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'mano',
				imageBase64: 'images/words/hand.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sombrero',
				imageBase64: 'images/words/hat.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cocina',
				imageBase64: 'images/words/kitchen.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cuchillo',
				imageBase64: 'images/words/knife.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'sarten',
				imageBase64: 'images/words/pan.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'lapizero',
				imageBase64: 'images/words/pencil.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'piano',
				imageBase64: 'images/words/piano.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'planta',
				imageBase64: 'images/words/plant.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'plato',
				imageBase64: 'images/words/plate.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cazo',
				imageBase64: 'images/words/saucepan.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'tijeras',
				imageBase64: 'images/words/scissors.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cucharita',
				imageBase64: 'images/words/small-spoon.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'escaleras',
				imageBase64: 'images/words/stairs.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'mesa',
				imageBase64: 'images/words/table.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cepillo',
				imageBase64: 'images/words/toothbrush.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'pasta',
				imageBase64: 'images/words/toothpaste.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'cocinita',
				imageBase64: 'images/words/toy-kitchen.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'juguetes',
				imageBase64: 'images/words/toys.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'arbol',
				imageBase64: 'images/words/tree.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'paraguas',
				imageBase64: 'images/words/umbrella.jpg'
			},
			{
				id: -1,
				categoryId: -2,
				word: 'ventana',
				imageBase64: 'images/words/window.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'brazo',
				imageBase64: 'images/words/arm.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'oreja',
				imageBase64: 'images/words/ear.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'ojo',
				imageBase64: 'images/words/eye.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'pie',
				imageBase64: 'images/words/foot.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'mano',
				imageBase64: 'images/words/hand.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'piernas',
				imageBase64: 'images/words/legs.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'nariz',
				imageBase64: 'images/words/nose.jpg'
			},
			{
				id: -1,
				categoryId: -3,
				word: 'dientes',
				imageBase64: 'images/words/teeth.jpg'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'huevo',
				imageBase64: 'images/words/eggs.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'garbanzos',
				imageBase64: 'images/words/chickpeas.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'almendras',
				imageBase64: 'images/words/almonds.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'pescado',
				imageBase64: 'images/words/fish.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'aguacate',
				imageBase64: 'images/words/avocado.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'platano',
				imageBase64: 'images/words/banana.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'manzana',
				imageBase64: 'images/words/apple.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'frambuesa',
				imageBase64: 'images/words/raspberries.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'tomate',
				imageBase64: 'images/words/tomatoes.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'fresa',
				imageBase64: 'images/words/strawberries.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'cereales',
				imageBase64: 'images/words/cereals.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'piña',
				imageBase64: 'images/words/pineapple.png'
			},
			{
				id: -1,
				categoryId: -4,
				word: 'guisantes',
				imageBase64: 'images/words/pees.png'
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
				imageBase64: 'images/words/squirrel.jpg'
			}
		]
	}
];
