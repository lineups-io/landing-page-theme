import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

const Placeholder = styled.div`
  text-align: center;
  font-size: 1.875em;
  margin-top: 60px;
  min-height: 500px;
`

const Page = ({ data, location }) => {
  const { site } = data.lineups

  const title = 'Contact Form Received'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title='Contact Form Received' />
      <Layout trackingData={trackingData} {...site}>
        <Placeholder>
          Thanks, we’ll be in touch soon!
        </Placeholder>
      </Layout>
  </>
}

export const query = graphql`
  query getSuccessPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
  }
`

export default Page
