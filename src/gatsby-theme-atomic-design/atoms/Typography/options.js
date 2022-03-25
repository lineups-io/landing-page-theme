const typographyOptions = {
  headerFontFamily: ['Inter', 'sans-serif'],
  bodyFontFamily: ['Inter', 'sans-serif'],
  headerWeight: 500,
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3),
      },
    }
  },
}

export default typographyOptions
