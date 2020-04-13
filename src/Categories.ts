export const Categories: Category[] = [
	{
		name: 'Animales',
		stages: [
			{
				word: 'ardilla',
				image: 'images/words/ardilla.jpg'
			},
			{
				word: 'caballo',
				image: 'images/words/caballo.jpg'
			},
			{
				word: 'cebra',
				image: 'images/words/cebra.jpg'
			},
			{
				word: 'ciervo',
				image: 'images/words/ciervo.jpg'
			},
			{
				word: 'conejo',
				image: 'images/words/conejo.jpg'
			},
			{
				word: 'elefante',
				image: 'images/words/elefante.jpg'
			},
			{
				word: 'gallina',
				image: 'images/words/gallina.jpg'
			},
			{
				word: 'gato',
				image: 'images/words/gato.jpg'
			},
			{
				word: 'lemur',
				image: 'images/words/lemur.jpg'
			},
			{
				word: 'oso',
				image: 'images/words/oso.jpg'
			},
			{
				word: 'panda',
				image: 'images/words/panda.jpg'
			},
			{
				word: 'periquito',
				image: 'images/words/periquito.jpg'
			},
			{
				word: 'perro',
				image: 'images/words/perro.jpg'
			},
			{
				word: 'tortuga',
				image: 'images/words/tortuga.jpg'
			},
			{
				word: 'vaca',
				image: 'images/words/vaca.jpg'
			},
			{
				word: 'yegua',
				image: 'images/words/yegua.jpg'
			}
		]
	},
	{
		name: 'Familia',
		stages: [
			{
				word: 'abuela',
				image: 'images/words/abuela.png',
			},
			{
				word: 'abuelo',
				image: 'images/words/abuelo.png',
			},
			{
				word: 'andres',
				image: 'images/words/andres.png',
			},
			{
				word: 'dani',
				image: 'images/words/dani.png',
			},
			{
				word: 'mama',
				image: 'images/words/mama.png',
			},
			{
				word: 'martina',
				image: 'images/words/martina.png',
			},
			{
				word: 'papa',
				image: 'images/words/papa.png',
			},
			{
				word: 'sara',
				image: 'images/words/sara.png',
			},
			{
				word: 'sophie',
				image: 'images/words/sophie.png',
			},
		]
	},
	{
		name: 'Chuches',
		stages: [
			{
				word: 'caramelo',
				image: 'images/words/caramelo.png'
			},
			{
				word: 'chupachups',
				image: 'images/words/chupa-chups.jpg'
			}
		]
	}
];

export interface Stage {
	word: string,
	image: string,
}

export interface Category {
	name: string,
	stages: Stage[]
}
