module.exports = {
  headerFontFamily: ['Avenir', 'sans-serif'],
  bodyFontFamily: ['Avenir', 'sans-serif'],
  bodyWeight: 500,
  overrideThemeStyles: (vr, options, styles) => ({
    'h1,h2,h3,h4,h5,h6': {
      marginBottom: vr.rhythm(1 / 3),
    },
  }),
}
