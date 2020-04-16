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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${ __dirname }/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: process.env.TITLE,
        short_name: process.env.TITLE,
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#00454d',
        display: 'minimal-ui',
        icon: 'src/images/icon.svg', // This path is relative to the root of the site.
      },
    },
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
        ],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Lineups',
        fieldName: 'lineups',
        url: process.env.GRAPHQL_API_URI,
        headers: {
          Authorization: `Bearer ${ process.env.GRAPHQL_API_KEY }`,
        },
      },
    },
    {
      resolve: 'gatsby-source-landing-pages',
      options: {
        account: process.env.ACCOUNT,
        url: process.env.GRAPHQL_API_URI,
        headers: {
          Authorization: `Bearer ${ process.env.GRAPHQL_API_KEY }`,
        },
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-theme-core',
    'gatsby-theme-apartment-page',
    'gatsby-theme-landing-page',
  ]
}
