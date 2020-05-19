import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'

import Helmet from 'gatsby-theme-core/src/components/Helmet'
import { PageContext } from 'gatsby-theme-core/src/components/PageContext'
import ContactForm from '../components/ContactForm'

const Page = props => {
  const { site, apartments } = props.data.lineups

  return <PageContext.Provider value={{ site }}>
      <Helmet title='Contact Us' />
      <Layout {...site}>
        <ContactForm apartments={apartments.items} />
      </Layout>
  </PageContext.Provider>
}

export const query = graphql`
  query getContactUsPageData($account: ID!) {
    lineups {
      site: getAccountById(id: $account) {
          ...NavFields
          ...FooterFields
      }
      apartments: findApartments(filter: { account: $account } sort: [["name", "1"]]) {
        count
        items {
          name
        }
      }
    }
  }
`

export default Page
