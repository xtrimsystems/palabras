import {
	ColorPink,
	ColorRed,
	ColorOrange,
	ColorYellow,
	ColorPurple,
	ColorBlue,
	ColorGreen,
	ColorBrown,
	ColorTheme,
	ColorThemeType
} from '../Domain';

export class ColorThemeBuilder {
	static build(colorThemeType: ColorThemeType): ColorTheme {
		switch (colorThemeType) {
			case ColorThemeType.GREEN:
				return new ColorGreen();
			case ColorThemeType.PINK:
				return new ColorPink();
			case ColorThemeType.BLUE:
				return new ColorBlue();
			case ColorThemeType.RED:
				return new ColorRed();
			case ColorThemeType.PURPLE:
				return new ColorPurple();
			case ColorThemeType.YELLOW:
				return new ColorYellow();
			case ColorThemeType.ORANGE:
				return new ColorOrange();
			case ColorThemeType.BROWN:
				return new ColorBrown();
			default:
				return new ColorPink();
		}
	}
}
