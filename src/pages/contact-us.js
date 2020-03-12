import React from 'react'
import { graphql } from 'gatsby'

import ThemeProvider from 'gatsby-theme-core/src/components/Theme'
import Layout from 'gatsby-theme-core/src/components/Layout'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import ContactForm from '../components/ContactForm'

const Page = props => {
  const { site } = props.data.lineups

  return <PageContext.Provider value={{ site }}>
    <ThemeProvider>
      <Helmet title='Contact Us' />
      <Layout>
        <ContactForm />
      </Layout>
    </ThemeProvider>
  </PageContext.Provider>
}

export const query = graphql`
  query getContactUsPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
    }
  }
`

export default Page
