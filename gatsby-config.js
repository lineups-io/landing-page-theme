const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

const queries = require('./gatsby-algolia.js')

console.log('[site] NODE_ENV=' + activeEnv)

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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: process.env.TITLE,
        short_name: process.env.TITLE,
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#E51F3B',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
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
        headers: {
          '/widgets/*': [
            'X-Frame-Options: SAMEORIGIN',
            `Content-Security-Policy: frame-ancestors *`,
            'Link: <https://cdn.filestackcontent.com>; rel=preconnect;',
            'Link: <https://res.cloudinary.com>; rel=preconnect;',
          ],
        },
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
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Admin',
        fieldName: 'admin',
        url: process.env.ADMIN_GRAPHQL_URI,
        headers: {
          Authorization: `Bearer ${ process.env.ADMIN_GRAPHQL_KEY }`,
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
    'gatsby-theme-atomic-design',
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ]
}
