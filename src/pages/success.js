import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import ThemeProvider from 'gatsby-theme-core/src/components/Theme'
import Layout from 'gatsby-theme-core/src/components/Layout'

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
    <ThemeProvider>
      <Helmet title='Contact Form Received' />
      <Layout>
        <Placeholder>
          Thanks, we’ll be in touch soon!
        </Placeholder>
      </Layout>
    </ThemeProvider>
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
