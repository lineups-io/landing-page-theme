import React from 'react'
import { graphql } from 'gatsby'

import numeral from 'numeral'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/LandingPage'
import { getSchemaOrgJSONLD } from './schema'

export default ({ data, location }) => {
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

  const context = {
    ...location,
    title,
    description,
    noindex,
    breadcrumb,
    bestPrice: bestPrice === Number.MAX_VALUE ? '' : numeral(bestPrice).format('$ 0,0'),
    apartments: data.lineups.page.apartments.items,
    termGroup: termGroup && termGroup.name,
    termGroupCategory: termGroup && termGroup.category,
    market: market && market.title,
    submarket: submarket && submarket.title,
    state: market && market.state.name,
    site: data.lineups.site,
  }

  const apartments = data.lineups.page.apartments.items.map(apartment => {
    return {
      ...apartment,
      defaultPhoto: {
        ...apartment.defaultPhoto,
      },
    }
  })

  return <>
    <Helmet title={context.title}>
      {[
        { name: 'description', content: context.description },
        { name: 'best-price', content: context.bestPrice },
        { name: 'term-group', content: context.termGroup },
        { name: 'term-group-category', content: context.termGroupCategory },
        { name: 'market', content: context.market },
        { name: 'submarket', content: context.submarket },
        { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index' },
      ].map((props, i) => <meta key={i} {...props} />)}
      <script type='application/ld+json'>
        {JSON.stringify(getSchemaOrgJSONLD(breadcrumb, apartments))}
      </script>
    </Helmet>
    <Layout {...data.lineups.site} {...data.lineups.page} bestPrice={bestPrice} />
  </>
}

export const query = graphql`
  query getLineupsPage($page: ID! $account: ID!) {
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
          sort: [["spotlight", "-1"], ["name", "1"]]
        ) {
          count
          items {
            ...ApartmentFields
          }
        }
      }
    }
  }
`
