import React from 'react'
import { graphql } from 'gatsby'

import Nav from 'gatsby-theme-core/src/components/Nav'
import Footer from 'gatsby-theme-core/src/components/Footer'
import { Layout, Main } from 'gatsby-theme-core/src/components/Layout/styled'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import ThemeProvider from 'gatsby-theme-core/src/components/Theme'
import Home from '../components/Home'

const Page = props => {
  const { site } = props.data.lineups

  return <PageContext.Provider value={{ site }}>
    <ThemeProvider>
      <Helmet title='Texas Apartments for Rent' />
      <Layout>
        <Nav />
        <Main>
          <Home />
          <Footer fullWidth={true} />
        </Main>
      </Layout>
    </ThemeProvider>
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
