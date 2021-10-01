// gatsby-node.js
const createLineupsApartmentPage = (node, createPage) => {
  const { enabledFeatures, marketingWebsiteUrl: path, lineupsId: id } = node
  if (enabledFeatures.indexOf('microsite') > -1) {
    console.log('[site] creating apartment page', path)
    createPage({
      path: path + '/gallery/',
      component: require.resolve('./src/templates/Gallery/index.js'),
      context: {
        id,
      },
    })
    return createPage({
      path,
      component: require.resolve('./src/templates/ApartmentPage/index.js'),
      context: {
        id,
        publicId: id,
      },
    })
  }
}

const createRealPageOnlineLeasingPage = (node, createPage) => {
  const { realPage, floorPlanUrl } = node
  if (realPage && realPage.siteId && floorPlanUrl) {
    console.log('[site] creating realpage floorplan page', floorPlanUrl)
    return createPage({
      path: floorPlanUrl,
      component: require.resolve('./src/templates/RealPageOnlineLeasing.js'),
      context: {
        ...realPage,
      },
    })
  } else {
    return Promise.resolve()
  }
}

const createLineupsPage = (node, createPage) => {
  const { noindex, slug, id, lineupsId: page } = node
  const path = `/${ noindex ? 'noindex/' : '' }${ slug }/`
  console.log('[site] creating landing page', path)
  return createPage({
    path,
    component: require.resolve('./src/templates/LandingPage/index.js'),
    context: {
      id,
      page,
    },
  })
}

const createMarkdownPage = (node, createPage) => {
  const { frontmatter: { path } } = node
  console.log('[site] creating markdown page', path)
  return createPage({
    path,
    component: require.resolve('./src/templates/Markdown.js'),
  })
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
      allLineupsApartment {
        nodes {
          lineupsId
          enabledFeatures
          marketingWebsiteUrl
          floorPlanUrl
        }
      }
      allLineupsPage {
        nodes {
          lineupsId
          id
          slug
          noindex
        }
      }
      allMarkdownRemark {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `

  return graphql(query, { account: process.env.ACCOUNT }).then(result => {
    const apartments = result.data.allLineupsApartment.nodes || []
    const pages = result.data.allLineupsPage.nodes || []
    const markdown = result.data.allMarkdownRemark.nodes || []

    const q1 = apartments.reduce(
      (acc, realpage) => acc.then(() => createRealPageOnlineLeasingPage(realpage, createPage)),
      Promise.resolve()
    )

    const q2 = apartments.reduce(
      (acc, apartment) => acc.then(() => createLineupsApartmentPage(apartment, createPage)),
      q1
    )

    const q3 = pages.reduce(
      (acc, page) => acc.then(() => createLineupsPage(page, createPage)),
      q2
    )

    const q4 = markdown.reduce(
      (acc, md) => acc.then(() => createMarkdownPage(md, createPage)),
      q3
    )

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
      q4
    )
  })
}
