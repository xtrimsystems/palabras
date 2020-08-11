import { LOCALES_EN, LOCALES_ES } from './Domain';

export interface InterfaceText
{
	appName: string,
	language: string,
	color: string,
	showLowerCase: string,
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
			language: 'Idioma',
			color: 'Color',
			showLowerCase: 'Mostrar letras en minúscula',
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
		}
	},
	{
		language: LOCALES_EN,
		texts: {
			appName: 'Letters',
			language: 'Language',
			color: 'Color',
			showLowerCase: 'Show lower case letters',
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
			uploadPhotoInfo: 'Click to load photo'
		}
	}
];
