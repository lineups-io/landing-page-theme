const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log('[landing-page-site] ' + activeEnv)

require('dotenv').config({
  path: `${ __dirname }/.env.${ activeEnv }`,
})

module.exports = {
  siteMetadata: {
    title: process.env.TITLE,
    siteUrl: process.env.URL,
  },
  'plugins': [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        ids: process.env.GOOGLE_TAG_MANAGER_ID.split(','),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/noindex/*', '/search'],
      },
    },
    'gatsby-plugin-meta-redirect',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: [
          'Link: <https://www.googletagmanager.com>; rel=preconnect;',
          'Link: <https://www.google-analytics.com>; rel=preconnect;',
          'Link: <https://api.mixpanel.com>; rel=preconnect;',
        ],
      },
    },
    'gatsby-theme-apartment-page',
    'gatsby-theme-landing-page',
  ]
}
