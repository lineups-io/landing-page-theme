import React from 'react'
import { graphql } from 'gatsby'
import { useTracking } from 'react-tracking'

import numeral from 'numeral'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/LandingPage'
import { getSchemaOrgJSONLD } from './schema'

export const Head = ({ data }) => {
  const {
    title,
    description,
    noindex,
    termGroup,
    breadcrumb,
  } = data.lineups.page
  const { market, submarket } = breadcrumb || {}

  const bestPrice = data.lineups.page.apartments.items.reduce((acc, apartment) => {
    let price
    if (termGroup && termGroup.name && termGroup.name.match(/^studios|[0-9] beds?$/i)) {
      const bedrooms = termGroup.name.replace(/studios/i, '0').replace(/ beds?/i, '')
      const ps = apartment.priceSummary.find(ps => ps.bedrooms === parseInt(bedrooms))

      if (ps && ps.min) {
        price = ps.min.effectiveRent.min
      }
    } else if (apartment.priceSummary) {
      const minPrices = apartment.priceSummary.filter(a => a.min).map(a => a.min.effectiveRent.min)
      const [lowest] = minPrices.sort((a, b) => parseFloat(a) - parseFloat(b))
      price = lowest
    }

    return price < acc ? price : acc
  }, Number.MAX_VALUE)

  const apartments = data.lineups.page.apartments.items.map(a => ({
    ...a,
    carousel: a.tour.length > 0 ? a.tour : a.carousel,
  }))

  return <Helmet title={title}>
    {[
      { name: 'description', content: description },
      { name: 'best-price', content: bestPrice === Number.MAX_VALUE ? '' : numeral(bestPrice).format('$ 0,0') },
      { name: 'term-group', content: termGroup && termGroup.name },
      { name: 'term-group-category', content: termGroup && termGroup.category },
      { name: 'market', content: market && market.title },
      { name: 'submarket', content: submarket && submarket.title },
      { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index' },
    ].map((props, i) => <meta key={i} {...props} />)}
    <script type='application/ld+json'>
      {JSON.stringify(getSchemaOrgJSONLD(breadcrumb, apartments))}
    </script>
  </Helmet>
}

const LandingPage = ({ data, location }) => {
  const {
    title,
    noindex,
    termGroup,
    breadcrumb,
  } = data.lineups.page
  const trackingData = { title, page: location.pathname }

  const { market, submarket } = breadcrumb || {}

  const bestPrice = data.lineups.page.apartments.items.reduce((acc, apartment) => {
    let price
    if (termGroup && termGroup.name && termGroup.name.match(/^studios|[0-9] beds?$/i)) {
      const bedrooms = termGroup.name.replace(/studios/i, '0').replace(/ beds?/i, '')
      const ps = apartment.priceSummary.find(ps => ps.bedrooms === parseInt(bedrooms))

      if (ps && ps.min) {
        price = ps.min.effectiveRent.min
      }
    } else if (apartment.priceSummary) {
      const minPrices = apartment.priceSummary.filter(a => a.min).map(a => a.min.effectiveRent.min)
      const [lowest] = minPrices.sort((a, b) => parseFloat(a) - parseFloat(b))
      price = lowest
    }

    return price < acc ? price : acc
  }, Number.MAX_VALUE)

  useTracking({
      event: 'custom.page.load',
      siteType: 'brand site',
      pageType: 'regional page',
      market: (market && market.title) || '(not set)',
      submarket: (submarket && submarket.title) || '(not set)',
      term: (termGroup && termGroup.name) || '(not set)',
      ppc: noindex ? 'true' : 'false',
  }, { dispatchOnMount: true })

  return <>
    <Layout trackingData={trackingData} {...data.lineups.site} {...data.lineups.page} bestPrice={bestPrice} />
  </>
}

export const query = graphql`
  query getLineupsPage($page: ID! $account: ID! $sort: String!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          pricingDisclaimer
          banner
      }
      page: getPageById(id: $page) {
        ...PageFields
        ...MapFields
        ...BreadcrumbFields
        apartments(
          filter: { status: published }
          sort: [["spotlight", "-1"], ["name", $sort]]
        ) {
          count
          items {
            ...ApartmentFields
            tour {
              url
              alt
            }
          }
        }
      }
    }
  }
`

export default LandingPage
