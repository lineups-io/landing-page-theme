require('./src/gatsby-theme-atomic-design/atoms/Typography/fonts.css')
const Math = require('core-js/es/math')

const LOCAL_STORAGE_KEY = 'utm_lineups'

exports.onClientEntry = () => {
  console.debug("We've started!", window.location.search)

  if (window.location.search) {
    const query = {}

    window.location.search.replace(/^\?/, '').split('&').forEach(s => {
      const [key, val] = s.split('=')
      query[key] = val
    })

    if (query[LOCAL_STORAGE_KEY]) {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY)

      const value = item ? JSON.parse(item) : []

      value.push({
        id: query[LOCAL_STORAGE_KEY],
        dt: new Date(),
      })

      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
    }
  }
}
