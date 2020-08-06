import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import Home from '../components/Home'

const Page = ({ data, location }) => {
  const { site } = data.lineups

  const title = 'Texas Apartments for Rent'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title} />
      <Layout trackingData={trackingData} {...site}>
          <Home />
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
    }
  }
`

export default Page
