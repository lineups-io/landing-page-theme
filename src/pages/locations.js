import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'
import Layout from 'gatsby-theme-atomic-design/src/templates/Locations'

const Page = ({ data, location }) => {
  const title = 'Search'
  const trackingData = { title, page: location.pathname }

  return <>
    <Helmet title={title}>
      <meta name='description' content='Find a Home' />
    </Helmet>
    <Layout trackingData={trackingData} {...data.lineups.site} markets={data.lineups.markets} />
  </>
}

export const query = graphql`
  query getLocationsPage($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
          displayMarketsByState
      }
      markets: findMarkets(filter: { account: $account } sort: [["market", "1"]]) {
        count
        items {
          ...LocationFields
        }
      }
    }
  }
`

export default Page
