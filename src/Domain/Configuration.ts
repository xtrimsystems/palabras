export interface Configuration
{
	language?: string;
	difficulty: Difficulties;
	isOpen: boolean;
	colorThemeType: ColorThemeType
}

export enum Difficulties {
	EASY = 'Facil',
	MEDIUM = 'Normal',
	HARD = 'Dificil'
}

export enum ColorThemeType {
	PINK = 'Pink',
	RED = 'Red',
	ORANGE = 'Orange',
	YELLOW = 'Yellow',
	PURPLE = 'Purple',
	BLUE = 'Blue',
	GREEN = 'Green',
	BROWN = 'Brown'
}

export interface ColorTheme {
	id: ColorThemeType,
	mainBackgroundColor: string,
	darkBackgroundColor: string,
	lightBackgroundColor: string,
	mainFontColor: string,
	darkFontColor: string,
	lightFontColor: string,
}

abstract class Color implements ColorTheme {
	lightgrey: string = '#ececec';
	abstract darkBackgroundColor: string;
	abstract darkFontColor: string;
	abstract id: ColorThemeType;
	abstract lightBackgroundColor: string;
	abstract lightFontColor: string;
	abstract mainBackgroundColor: string;
	abstract mainFontColor: string;
}

export class ColorPink extends Color {
	id = ColorThemeType.PINK;
	mainBackgroundColor = '#ec407a';
	darkBackgroundColor = '#b4004e';
	lightBackgroundColor = '#ff77a9';
	mainFontColor = 'black';
	darkFontColor = 'white';
	lightFontColor = 'black';
}

export class ColorPurple extends Color {
	id = ColorThemeType.PURPLE;
	mainBackgroundColor = '#ab47bc';
	darkBackgroundColor = '#790e8b';
	lightBackgroundColor = '#df78ef';
	mainFontColor = 'white';
	darkFontColor = 'white';
	lightFontColor = 'black';
}

export class ColorBlue extends Color {
	id = ColorThemeType.BLUE;
	mainBackgroundColor = '#42a5f5';
	darkBackgroundColor = '#0077c2';
	lightBackgroundColor = '#80d6ff';
	mainFontColor = 'black';
	darkFontColor = 'white';
	lightFontColor = 'black';
}

export class ColorGreen extends Color {
	id = ColorThemeType.GREEN;
	mainBackgroundColor = '#66bb6a';
	darkBackgroundColor = '#338a3e';
	lightBackgroundColor = '#98ee99';
	mainFontColor = 'black';
	darkFontColor = 'black';
	lightFontColor = 'black';
}

export class ColorYellow extends Color {
	id = ColorThemeType.YELLOW;
	mainBackgroundColor = '#ffca28';
	darkBackgroundColor = '#c79a00';
	lightBackgroundColor = '#fffd61';
	mainFontColor = 'black';
	darkFontColor = 'black';
	lightFontColor = 'black';
}

export class ColorOrange extends Color {
	id = ColorThemeType.ORANGE;
	mainBackgroundColor = '#ff7043';
	darkBackgroundColor = '#c63f17';
	lightBackgroundColor = '#ffa270';
	mainFontColor = 'black';
	darkFontColor = 'white';
	lightFontColor = 'black';
}

export class ColorRed extends Color {
	id = ColorThemeType.RED;
	mainBackgroundColor = '#f44336';
	darkBackgroundColor = '#ba000d';
	lightBackgroundColor = '#ff7961';
	mainFontColor = 'black';
	darkFontColor = 'white';
	lightFontColor = 'black';
}

export class ColorBrown extends Color {
	id = ColorThemeType.BROWN;
	mainBackgroundColor = '#8d6e63';
	darkBackgroundColor = '#5f4339';
	lightBackgroundColor = '#be9c91';
	mainFontColor = 'black';
	darkFontColor = 'white';
	lightFontColor = 'black';
}
