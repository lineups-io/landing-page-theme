import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'

const Placeholder = styled.div`
  text-align: center;
  font-size: 1.875em;
  margin-top: 60px;
  min-height: 500px;
`

const Page = props => {
  const { site } = props.data.lineups

  return <PageContext.Provider value={{ site }}>
      <Helmet title='Contact Form Received' />
      <Layout {...site}>
        <Placeholder>
          Thanks, we’ll be in touch soon!
        </Placeholder>
      </Layout>
  </PageContext.Provider>
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
