import { gutter, colors, fonts } from './options'

export default {
  gutter,
  colors: {
    ...colors,
  },
  fonts,
  fontColorWithBackground: {
    primary: colors.white,
    secondary: colors.white,
    tertiary: colors.black,
    gray50: colors.black,
    gray100: colors.black,
    gray200: colors.black,
    gray300: colors.black,
    gray400: colors.black,
    gray500: colors.black,
    gray600: colors.white,
    gray700: colors.white,
    gray800: colors.white,
    gray900: colors.white,
    white: colors.black,
    black: colors.white,
  },
}
