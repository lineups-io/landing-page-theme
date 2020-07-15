import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'gatsby-theme-atomic-design/src/templates/Blank'
import Helmet from 'gatsby-theme-atomic-design/src/organisms/Helmet'

import ContactForm from '../components/ContactForm'

const Page = ({ data, location }) => {
  const { site, apartments } = data.lineups

  const title = 'Contact Us'
  const trackingData = { title, page: location.pathname }

  return <>
      <Helmet title={title} />
      <Layout trackingData={trackingData} {...site}>
        <ContactForm apartments={apartments.items} />
      </Layout>
  </>
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
