import { LOCALES_EN, LOCALES_ES } from './Domain';

export interface InterfaceText
{
	appName: string,
	language: string,
	color: string,
	showLowerCase: string,
	save: string,
	veryGood: string,
	category: string,
	repeatLetter: string,
	pressLetter: string,
	theWordToWriteIs: string,
	start: string,
	letsStart: string,
	backToMenu: string,
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
			appName: 'Palabras',
			language: 'Idioma',
			color: 'Color',
			showLowerCase: 'Mostrar letras en minúscula',
			save: 'Guardar',
			veryGood: 'Muy Bien!',
			category: 'Categoría',
			repeatLetter: 'Repetir letra',
			pressLetter: 'Teclea la letra',
			theWordToWriteIs: 'La palabra a escribir es',
			start: 'Empezar!',
			letsStart: 'Vamos a empezar!',
			backToMenu: 'Volver al menu'
		}
	},
	{
		language: LOCALES_EN,
		texts: {
			appName: 'Words',
			language: 'Language',
			color: 'Color',
			showLowerCase: 'Show lower case letters',
			save: 'Save',
			veryGood: 'Very Good!',
			category: 'Category',
			repeatLetter: 'Repeat letter',
			pressLetter: 'Press the key',
			theWordToWriteIs: 'The word to write is',
			start: 'Start!',
			letsStart: 'Lets start!',
			backToMenu: 'Back to menu'
		}
	}
];
