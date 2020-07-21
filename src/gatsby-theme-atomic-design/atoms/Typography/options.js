export default {
  headerFontFamily: ['Avenir', 'sans-serif'],
  bodyFontFamily: ['Avenir', 'sans-serif'],
  bodyWeight: 500,
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3),
      },
    }
  },
}
