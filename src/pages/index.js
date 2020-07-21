import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import Home from '../components/Home'

const Page = ({ data, location }) => {
  const { site } = data.lineups

  const title = 'Home'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title}>
        <meta name='description' content={`
          Find your new apartment home at SRG Residential.
          Pet-friendly, studio, attached garages, and more. ' +
          Life made simple starts at SRGLiving.com.
        `} />
      </Helmet>
      <Layout trackingData={trackingData} {...site}>
          <Home markets={data.lineups.markets.items.filter(m => !m.submarket)} />
      </Layout>
  </>
}

export const query = graphql`
  query getHomePageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      markets: findMarkets(filter: { account: $account }) {
        count
        items {
          title: market
          submarket
          marketPage {
            slug
          }
        }
      }
    }
  }
`

export default Page
