import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import Home from '../components/Home'

const Page = props => {
  const { site } = props.data.lineups

  return <PageContext.Provider value={{ site }}>
      <Helmet title='Texas Apartments for Rent' />
      <Layout {...site}>
          <Home />
      </Layout>
  </PageContext.Provider>
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
