module.exports = {
  headerFontFamily: ['Avenir', 'sans-serif'],
  bodyFontFamily: ['Avenir', 'sans-serif'],
  bodyWeight: 500,
  overrideThemeStyles: ({ rhythm }, options, styles) => ({
    'h1,h2,h3,h4,h5,h6': {
      marginBottom: rhythm(1 / 3),
    },
  }),
}
