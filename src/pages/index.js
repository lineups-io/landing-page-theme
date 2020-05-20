import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import Home from '../components/Home'

const Page = props => {
  const { site } = props.data.lineups

  return <>
      <Helmet title='Texas Apartments for Rent' />
      <Layout {...site}>
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
