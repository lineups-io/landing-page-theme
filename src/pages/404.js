import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/PageNotFound'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

export const Head = () => <Helmet title='Page Not Found' />

const Page = ({ data, location }) => {
  const { site } = data.lineups

  const title = 'Page Not Found'
  const trackingData = { title, page: location.pathname }

  return <>
      <Layout trackingData={trackingData} {...site}>
      </Layout>
  </>
}

export const query = graphql`
  query get404PageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
  }
`

export default Page
