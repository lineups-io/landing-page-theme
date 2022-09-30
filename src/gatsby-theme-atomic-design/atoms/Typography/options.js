const typographyOptions = {
  headerFontFamily: ['ff-good-headline-web-pro-con', 'sans-serif'],
  bodyFontFamily: ['ff-good-headline-condensed-p', 'sans-serif'],
  bodyWeight: 500,
  scaleRatio: 2.5,
  baseFontSize: '20px',
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1': {
        fontWeight: 500,
      },
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3),
      },
    }
  },
}

export default typographyOptions
