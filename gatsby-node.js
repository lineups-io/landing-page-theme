// gatsby-node.js
exports.onCreateNode = ({ node: { internal, ...node }, actions }) => {
  const { createPage } = actions
  if (internal.type === 'LineupsApartment') {
    const { enabledFeatures, marketingWebsiteUrl: path, lineupsId: id, realPage, floorPlanUrl } = node
    if (enabledFeatures.indexOf('microsite') > -1) {
      console.log('[gatsby-theme-apartment-page] creating page', path)
      createPage({
        path,
        component: require.resolve('./src/templates/ApartmentPage/index.js'),
        context: {
          id,
          account: process.env.ACCOUNT,
        },
      })
    }
    if (realPage && realPage.siteId && floorPlanUrl) {
      console.log('[gatsby-theme-apartment-page] creating realpage floorplan page', floorPlanUrl)
      createPage({
        path: floorPlanUrl,
        component: require.resolve('./src/templates/RealPageOnlineLeasing.js'),
        context: {
          account: process.env.ACCOUNT,
          ...realPage,
        },
      })
    }
  } else if (internal.type === 'LineupsPage') {
    const { noindex, slug, id, lineupsId: page } = node
    const path = `/${ noindex ? 'noindex/' : '' }${ slug }/`
    console.log('[gatsby-theme-landing-page] creating page', path)
    createPage({
      path,
      component: require.resolve('./src/templates/LandingPage/index.js'),
      context: {
        id,
        page,
        account: process.env.ACCOUNT,
      },
    })
  } else if (internal.type === 'MarkdownRemark') {
    const { frontmatter: { path } } = node
    console.log('[gatsby-theme-landing-page] creating page', path)
    createPage({
      path,
      component: require.resolve('./src/templates/Markdown.js'),
      context: {
        account: process.env.ACCOUNT,
      },
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      account: process.env.ACCOUNT,
    },
  })
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions
}
