// gatsby-node.js
exports.onCreateNode = ({ node: { internal, ...node }, actions }) => {
  const { createPage } = actions
  if (internal.type === 'LineupsApartment') {
    const { enabledFeatures, marketingWebsiteUrl: path, lineupsId: id, realPage, floorPlanUrl } = node
    if (enabledFeatures.indexOf('microsite') > -1) {
      console.log('[site] creating apartment page', path)
      createPage({
        path,
        component: require.resolve('./src/templates/ApartmentPage/index.js'),
        context: {
          id,
          publicId: id,
        },
      })
    }
    if (realPage && realPage.siteId && floorPlanUrl) {
      console.log('[site] creating realpage floorplan page', floorPlanUrl)
      createPage({
        path: floorPlanUrl,
        component: require.resolve('./src/templates/RealPageOnlineLeasing.js'),
        context: {
          ...realPage,
        },
      })
    }
  } else if (internal.type === 'LineupsPage') {
    const { noindex, slug, id, lineupsId: page } = node
    const path = `/${ noindex ? 'noindex/' : '' }${ slug }/`
    console.log('[site] creating landing page', path)
    createPage({
      path,
      component: require.resolve('./src/templates/LandingPage/index.js'),
      context: {
        id,
        page,
      },
    })
  } else if (internal.type === 'MarkdownRemark') {
    const { frontmatter: { path } } = node
    console.log('[site] creating markdown page', path)
    createPage({
      path,
      component: require.resolve('./src/templates/Markdown.js'),
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const query = `
    query getWidgets($account: String) {
      admin {
        apartments (input: { filter: { status: { _eq: "published" }, account: { _eq: $account } } }) {
          results {
            widgets(status: "published") {
                id: _id
                title
            }
          }
          totalCount
        }
      }
    }
  `

  return graphql(query, { account: process.env.ACCOUNT }).then(result => {
    const { results = [] } = result.data.admin.apartments

    const widgets = []
    results.forEach(apartment => {
      (apartment.widgets || []).forEach(widget => widgets.push(widget))
    })

    return widgets.reduce(
      (acc, widget) => acc.then(() => {
        const path = `/widgets/${ widget.id.toLowerCase() }/`
        console.log('[site] creating widget page', path, widget.title)
        return createPage({
          path,
          component: require.resolve('./src/templates/WidgetPage/index.js'),
          context: {
            id: widget.id,
            account: process.env.ACCOUNT,
          },
        })
      }),
      Promise.resolve()
    )
  })
}
