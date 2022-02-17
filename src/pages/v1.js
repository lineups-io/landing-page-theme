import React from 'react'
import { graphql } from 'gatsby'
import algoliasearch from 'algoliasearch/lite'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Search'

export default ({ data, location, navigate }) => {
  const title = 'Search'
  const trackingData = { title, page: location.pathname }

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )

  return <>
    <Helmet title={title}>
      {[
        { name: 'robots', content: 'noindex,nofollow' },
      ].map((props, i) => <meta key={i} {...props} />)}
    </Helmet>
    <Layout trackingData={trackingData} {...data.lineups.site} markets={data.lineups.markets} version={1} location={location} navigate={navigate} searchClient={searchClient} />
  </>
}

export const query = graphql`
  query getSearchVersion1Page($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          pricingDisclaimer
          banner
      }
      markets: findMarkets(
        filter: { account: $account }
        sort: [["market", "1"], ["submarket", "1"]]
      ) {
        count
        items {
          ...LocationGeoSearchFields
        }
      }
    }
  }
`
