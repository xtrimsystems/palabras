import { LOCALES_EN, LOCALES_ES } from './Domain';

export interface InterfaceText
{
	appName: string,
	metaDescription: string,
	metaKeywords: string,
	language: string,
	color: string,
	showLowerCase: string,
	showRewardScreen: string,
	veryGood: string,
	category: string,
	newCategory: string,
	name: string
	newStage: string,
	repeatLetter: string,
	pressLetter: string,
	theWordToWriteIs: string,
	start: string,
	letsStart: string,
	backToMenu: string,
	close: string,
	create: string,
	uploadPhotoInfo: string,
	game: string,
	myCategories: string,
	settings: string,
}

export interface I18n
{
	language: string,
	texts: InterfaceText
}

export const InterfaceTexts: I18n[] = [
	{
		language: LOCALES_ES,
		texts: {
			appName: 'Letras',
			metaDescription: 'Juego para aprender a user el teclado y la posicion de las teclas en el teclado. Perfecto para niños y mayores.',
			metaKeywords: 'aprender, niño, niña, niños, niñas, mayores, senior, teclado, letras, tecla',
			language: 'Idioma',
			color: 'Color',
			showLowerCase: 'Mostrar letras en minúscula',
			showRewardScreen: 'Mostrar pantalla de recompensa',
			veryGood: 'Muy Bien!',
			category: 'Categoría',
			newCategory: 'Nueva Categoría',
			name: 'Nombre',
			newStage: 'Nueva Palabra',
			repeatLetter: 'Repetir letra',
			pressLetter: 'Teclea la letra',
			theWordToWriteIs: 'La palabra a escribir es',
			start: 'Empezar!',
			letsStart: 'Vamos a empezar!',
			backToMenu: 'Volver al menu',
			close: 'Cerrar',
			create: 'Crear',
			uploadPhotoInfo: 'Click para cargar foto',
			game: 'Juego',
			myCategories: 'Mis Categorias',
			settings: 'Opciones'
		}
	},
	{
		language: LOCALES_EN,
		texts: {
			appName: 'Letters',
			metaDescription: 'Game for learning how to use the keyboard and the position of the keys in the keyboard. Perfect for kids and elder.',
			metaKeywords: 'learn, kid, kids, elder, keyboard, letters, key',
			language: 'Language',
			color: 'Color',
			showLowerCase: 'Show lower case letters',
			showRewardScreen: 'Show reward screen',
			veryGood: 'Very Good!',
			category: 'Category',
			newCategory: 'New Category',
			name: 'Name',
			newStage: 'New Word',
			repeatLetter: 'Repeat letter',
			pressLetter: 'Press the key',
			theWordToWriteIs: 'The word to write is',
			start: 'Start!',
			letsStart: 'Lets start!',
			backToMenu: 'Back to menu',
			close: 'Close',
			create: 'Create',
			uploadPhotoInfo: 'Click to load photo',
			game: 'Game',
			myCategories: 'My Categories',
			settings: 'Settings'
		}
	}
];
